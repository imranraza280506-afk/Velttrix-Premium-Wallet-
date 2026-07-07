/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Sparkles, RotateCw, ZoomIn, Eye } from "lucide-react";

interface WalletModel3DProps {
  scrollProgress?: number; // 0 to 1 across the page
  sectionIndex?: number; // active section
  isOpenOverride?: boolean;
  autoRotateOnly?: boolean;
  forceOpen?: boolean;
}

export default function WalletModel3D({
  scrollProgress = 0,
  sectionIndex = 0,
  isOpenOverride = false,
  autoRotateOnly = false,
  forceOpen = false,
}: WalletModel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Interaction States
  const [isHovered, setIsHovered] = useState(false);
  const [currentAngle, setCurrentAngle] = useState({ x: 0.3, y: -0.4 });
  const [targetAngle, setTargetAngle] = useState({ x: 0.3, y: -0.4 });
  const [isUserRotating, setIsUserRotating] = useState(false);
  const [walletColor, setWalletColor] = useState("#c59b7b"); // Copper-bronze primary
  const [loading, setLoading] = useState(true);

  // References to animate Three.js objects inside the render loop
  const walletGroupRef = useRef<THREE.Group | null>(null);
  const frontShellRef = useRef<THREE.Mesh | null>(null);
  const backShellRef = useRef<THREE.Mesh | null>(null);
  const accordionGroupRef = useRef<THREE.Group | null>(null);
  const cardGroupRef = useRef<THREE.Group | null>(null);
  const openProgressRef = useRef<number>(0); // 0 (closed) to 1 (fully open)

  // WebGL support check
  const [webglSupported, setWebglSupported] = useState(true);

  // Drag handlers
  const pointerStart = useRef({ x: 0, y: 0 });
  const angleStart = useRef({ x: 0, y: 0 });
  const rotationOffset = useRef(0);
  const clockRef = useRef<THREE.Clock | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Create Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080808, 0.08);

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Parent group to hold the entire wallet system
    const walletSystem = new THREE.Group();
    scene.add(walletSystem);
    walletGroupRef.current = walletSystem;

    // --- PROCEDURAL LOGO TEXTURE CANVAS ---
    const logoCanvas = document.createElement("canvas");
    logoCanvas.width = 1024;
    logoCanvas.height = 625; // Perfect 3.6 : 2.2 aspect ratio of the front shell
    const ctx = logoCanvas.getContext("2d");
    if (ctx) {
      // 1. Brushed metal background based on the current active premium color selection
      ctx.fillStyle = walletColor;
      ctx.fillRect(0, 0, 1024, 625);

      // Add thousands of high-fidelity fine brush strokes for a luxurious brushed aluminum/bronze finish
      for (let i = 0; i < 48000; i++) {
        const x = Math.random() * 1024;
        const y = Math.random() * 625;
        const w = Math.random() * 30 + 10; // realistic metal brush stroke lengths
        // Alternating light reflections and fine micro-shadows
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.05})`;
        ctx.fillRect(x, y, w, 1);
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.04})`;
        ctx.fillRect(x, y + 1, w, 1);
      }

      // Add a smooth metallic studio glare gradient
      const metallicGradient = ctx.createLinearGradient(0, 0, 1024, 625);
      metallicGradient.addColorStop(0, "rgba(0, 0, 0, 0.25)");
      metallicGradient.addColorStop(0.25, "rgba(255, 255, 255, 0.12)");
      metallicGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.0)");
      metallicGradient.addColorStop(0.75, "rgba(255, 255, 255, 0.08)");
      metallicGradient.addColorStop(1, "rgba(0, 0, 0, 0.28)");
      ctx.fillStyle = metallicGradient;
      ctx.fillRect(0, 0, 1024, 625);

      // 2. Draw luxury horizontal logo "VELTRIX [V]" at the bottom-right quadrant (exactly like the photo)
      ctx.fillStyle = "rgba(255, 255, 255, 0.82)"; // Silver laser-etched lettering
      ctx.font = "bold 34px 'Space Grotesk', 'Inter', sans-serif";
      ctx.letterSpacing = "9px";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      // Embossed depth shadows
      ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
      ctx.shadowBlur = 3;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      const logoStartX = 540;
      const logoCenterY = 460;

      // Draw brand text
      ctx.fillText("VELTRIX", logoStartX, logoCenterY);

      // Calculate placement of adjacent shield icon on the right
      const brandWidth = ctx.measureText("VELTRIX").width;
      const shieldCenterX = logoStartX + brandWidth + 35;
      const shieldCenterY = logoCenterY;
      const shieldRadius = 20;

      // Reset text shadows slightly for clean lines
      ctx.shadowBlur = 2;

      // Draw the shield outline
      ctx.strokeStyle = "rgba(255, 255, 255, 0.82)";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(shieldCenterX, shieldCenterY - shieldRadius);
      ctx.lineTo(shieldCenterX + shieldRadius, shieldCenterY - shieldRadius * 0.6);
      ctx.lineTo(shieldCenterX + shieldRadius, shieldCenterY + shieldRadius * 0.3);
      ctx.quadraticCurveTo(shieldCenterX + shieldRadius, shieldCenterY + shieldRadius * 0.9, shieldCenterX, shieldCenterY + shieldRadius * 1.35);
      ctx.quadraticCurveTo(shieldCenterX - shieldRadius, shieldCenterY + shieldRadius * 0.9, shieldCenterX - shieldRadius, shieldCenterY + shieldRadius * 0.3);
      ctx.lineTo(shieldCenterX - shieldRadius, shieldCenterY - shieldRadius * 0.6);
      ctx.closePath();
      ctx.stroke();

      // Draw capital "V" centered inside shield
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = "bold 22px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "0px";
      ctx.fillText("V", shieldCenterX, shieldCenterY + 1.5);
    }

    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    logoTexture.wrapS = THREE.ClampToEdgeWrapping;
    logoTexture.wrapT = THREE.ClampToEdgeWrapping;

    // --- MATERIALS ---
    // Luxury bronze metal shell
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(walletColor),
      metalness: 0.92,
      roughness: 0.28,
      bumpScale: 0.05,
      shadowSide: THREE.DoubleSide,
    });

    // Engraved front shell material using the logo canvas
    const frontMetalMaterial = new THREE.MeshStandardMaterial({
      map: logoTexture,
      metalness: 0.9,
      roughness: 0.3,
      shadowSide: THREE.DoubleSide,
    });

    // Dark grey interior aluminum/plastic body
    const interiorMaterial = new THREE.MeshStandardMaterial({
      color: 0x181818,
      metalness: 0.6,
      roughness: 0.5,
    });

    // Inner Accordion pockets (black matte high-grade polymer/fabric)
    const accordionMaterial = new THREE.MeshStandardMaterial({
      color: 0x0c0c0c,
      roughness: 0.85,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    // --- GEOMETRIES & ASSEMBLING ---
    // --- GEOMETRIES & ASSEMBLING ---
    // Wallet dimensions matching real design (wide sturdy metal cardholder case)
    const widthW = 3.6;
    const heightH = 2.2;
    const thicknessT = 0.14; // Sturdier metal profile matching the photos

    // Shiny silver-chrome frame material
    const silverMaterial = new THREE.MeshStandardMaterial({
      color: 0xcccccc,
      metalness: 0.95,
      roughness: 0.15,
    });

    // 6 material array for the front shell so texture is only mapped to the outer front face
    const frontMaterials = [
      metalMaterial,      // Right (X+)
      metalMaterial,      // Left (X-)
      metalMaterial,      // Top (Y+)
      metalMaterial,      // Bottom (Y-)
      frontMetalMaterial, // Front (Z+) -> Contains the custom "VELTRIX" & shield logo
      interiorMaterial,   // Back (Z-) -> Sits on the inside
    ];

    // Front case shell Box
    const shellGeo = new THREE.BoxGeometry(widthW, heightH, thicknessT);
    const frontShellMesh = new THREE.Mesh(shellGeo, frontMaterials);
    // Offset the mesh so it pivots from the bottom hinge edge
    frontShellMesh.position.set(0, heightH / 2, thicknessT / 2);
    frontShellMesh.castShadow = true;
    frontShellMesh.receiveShadow = true;

    // --- INNER SILVER RIM & BLACK INLAY (FRONT SHELL) ---
    const frameWidth = widthW - 0.04;
    const frameHeight = heightH - 0.04;
    const frameDepth = 0.04;
    const frameGeo = new THREE.BoxGeometry(frameWidth, frameHeight, frameDepth);
    const frontInnerFrame = new THREE.Mesh(frameGeo, silverMaterial);
    // Nested inside the top shell face
    frontInnerFrame.position.set(0, 0, -thicknessT / 2 - frameDepth / 2 + 0.01);
    frontInnerFrame.castShadow = true;
    frontInnerFrame.receiveShadow = true;
    frontShellMesh.add(frontInnerFrame);

    const inlayWidth = frameWidth - 0.12;
    const inlayHeight = frameHeight - 0.12;
    const inlayDepth = 0.015;
    const inlayGeo = new THREE.BoxGeometry(inlayWidth, inlayHeight, inlayDepth);
    const frontInlay = new THREE.Mesh(inlayGeo, interiorMaterial);
    frontInlay.position.set(0, 0, -thicknessT / 2 - frameDepth + 0.012);
    frontInlay.castShadow = true;
    frontShellMesh.add(frontInlay);

    // --- LUXURY SILVER RIVETS (FRONT EDGE) ---
    // 4 small round silver screw/rivet heads along the bottom edge (front lip)
    const rivetGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.015, 12);
    const rivetPositionsX = [-1.3, -0.45, 0.45, 1.3];
    rivetPositionsX.forEach((rx) => {
      const rivet = new THREE.Mesh(rivetGeo, silverMaterial);
      rivet.rotation.x = Math.PI / 2; // Face outward
      // Place near the opening edge (top lip)
      rivet.position.set(rx, heightH / 2 - 0.08, thicknessT / 2 + 0.006);
      rivet.castShadow = true;
      frontShellMesh.add(rivet);
    });

    // Group to pivot the front shell from bottom-most hinge
    const frontPivot = new THREE.Group();
    frontPivot.position.set(0, -heightH / 2, thicknessT / 2);
    frontPivot.add(frontShellMesh);
    walletSystem.add(frontPivot);
    frontShellRef.current = frontShellMesh;

    // Back case shell materials (plain brushed bronze metal on all outer surfaces)
    const backMaterials = [
      metalMaterial, // Right
      metalMaterial, // Left
      metalMaterial, // Top
      metalMaterial, // Bottom
      interiorMaterial, // Front (facing inside)
      metalMaterial, // Back (outer rear cover)
    ];

    const backShellMesh = new THREE.Mesh(shellGeo, backMaterials);
    backShellMesh.position.set(0, heightH / 2, -thicknessT / 2);
    backShellMesh.castShadow = true;
    backShellMesh.receiveShadow = true;

    // --- INNER SILVER RIM & BLACK INLAY (BACK SHELL) ---
    const backInnerFrame = new THREE.Mesh(frameGeo, silverMaterial);
    backInnerFrame.position.set(0, 0, thicknessT / 2 + frameDepth / 2 - 0.01);
    backInnerFrame.castShadow = true;
    backInnerFrame.receiveShadow = true;
    backShellMesh.add(backInnerFrame);

    const backInlay = new THREE.Mesh(inlayGeo, interiorMaterial);
    backInlay.position.set(0, 0, thicknessT / 2 + frameDepth - 0.012);
    backInlay.castShadow = true;
    backShellMesh.add(backInlay);

    // --- SECURE RELEASE BUTTON / LATCH ---
    // Central push button clasp
    const latchGeo = new THREE.BoxGeometry(0.42, 0.09, 0.15);
    const latchMesh = new THREE.Mesh(latchGeo, silverMaterial);
    latchMesh.position.set(0, heightH / 2, thicknessT / 2 + 0.035);
    latchMesh.castShadow = true;
    backShellMesh.add(latchMesh);

    const backPivot = new THREE.Group();
    backPivot.position.set(0, -heightH / 2, -thicknessT / 2);
    backPivot.add(backShellMesh);
    walletSystem.add(backPivot);
    backShellRef.current = backShellMesh;

    // --- ACCORDION DIVIDERS ---
    const accordionGroup = new THREE.Group();
    accordionGroup.position.set(0, 0, 0);
    walletSystem.add(accordionGroup);
    accordionGroupRef.current = accordionGroup;

    // Generate 6 accordion fold segments
    const numFolds = 6;
    const accordionPockets: THREE.Mesh[] = [];

    for (let i = 0; i < numFolds; i++) {
      // Each fold consists of a V-shape divider
      // We can model this with nested flat plates
      const pocketWidth = widthW - 0.2;
      const pocketHeight = heightH - 0.2;
      const pocketGeo = new THREE.BoxGeometry(pocketWidth, pocketHeight, 0.02);
      const pocketMesh = new THREE.Mesh(pocketGeo, accordionMaterial);
      pocketMesh.castShadow = true;

      // Position the folders in Z, stacked
      const zOffset = (i - (numFolds - 1) / 2) * 0.12;
      pocketMesh.position.set(0, 0, zOffset);
      accordionGroup.add(pocketMesh);
      accordionPockets.push(pocketMesh);
    }

    // --- PREMIUM CREDIT CARDS INSIDE ---
    const cardGroup = new THREE.Group();
    walletSystem.add(cardGroup);
    cardGroupRef.current = cardGroup;

    const cardColors = [
      0x1c1c1c, // Stealth Matte Black
      0x8c6239, // Bronze / Gold Luxury Card
      0x3b5998, // Cobalt Premium Blue Card
      0x222222, // Platinum Elite Card
    ];

    const cards: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const cardW = widthW - 0.3;
      const cardH = heightH - 0.1;
      const cardD = 0.015;
      const cardGeo = new THREE.BoxGeometry(cardW, cardH, cardD);

      const cardMat = new THREE.MeshStandardMaterial({
        color: cardColors[i % cardColors.length],
        roughness: 0.2,
        metalness: i === 1 ? 0.8 : 0.4,
      });

      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.castShadow = true;

      // Position cards tucked neatly within pockets
      const cardZ = (i - 1.5) * 0.16;
      cardMesh.position.set(0, 0, cardZ);
      cardGroup.add(cardMesh);
      cards.push(cardMesh);

      // Add a tiny silver smart-chip on some cards
      if (i % 2 === 0) {
        const chipGeo = new THREE.BoxGeometry(0.4, 0.3, 0.005);
        const chipMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 0.9, roughness: 0.1 });
        const chip = new THREE.Mesh(chipGeo, chipMat);
        chip.position.set(-0.8, 0.3, 0.01);
        cardMesh.add(chip);
      }
    }

    // --- DECORATIVE LIGHTS / REFLECTIONS ---
    // Main soft ambient
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Directional Studio Key Light (Warm Gold)
    const dirLight1 = new THREE.DirectionalLight(0xffecd2, 3.5);
    dirLight1.position.set(5, 5, 8);
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 2048;
    dirLight1.shadow.mapSize.height = 2048;
    dirLight1.shadow.bias = -0.0001;
    scene.add(dirLight1);

    // Rim/Kick Light (Cool Slate Blue) for beautiful metallic edges
    const dirLight2 = new THREE.DirectionalLight(0xadd8e6, 3.0);
    dirLight2.position.set(-8, 3, -4);
    scene.add(dirLight2);

    // Dynamic color light highlighting the logo
    const pointLight = new THREE.PointLight(0xc59b7b, 4, 15);
    pointLight.position.set(0, 1.5, 3);
    scene.add(pointLight);

    // Soft reflective floor grid (very minimal)
    const gridHelper = new THREE.GridHelper(20, 20, 0xa17855, 0x222222);
    gridHelper.position.y = -2.5;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Shadow catcher floor
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.5;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    setLoading(false);

    // --- SCROLL ANIMATION STATES ---
    // Let's program scroll triggers inside the RAF loop based on scrollProgress & sectionIndex
    const clock = new THREE.Clock();
    clockRef.current = clock;

    // --- ANIMATION LOOP ---
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth opening/closing based on scroll and override
      // Target opening state: opens in section 2 (Story) and section 3 (Showcase)
      let targetOpen = 0;
      if (forceOpen) {
        targetOpen = 1.25; // Extra wide open to showcase fanned accordion pocket compartments beautifully
      } else if (isOpenOverride) {
        targetOpen = 1;
      } else if (autoRotateOnly) {
        targetOpen = 0; // Remain closed for luxury exterior showcase
      } else if (sectionIndex === 2) {
        // Story section: slightly open
        targetOpen = 0.25;
      } else if (sectionIndex === 3) {
        // Showcase: fully open and rotating
        targetOpen = 1.0;
      } else if (sectionIndex === 5) {
        // Gallery: moderate open
        targetOpen = 0.4;
      } else if (sectionIndex === 8) {
        // CTA: half open with rotating animation
        targetOpen = 0.5;
      }

      // Interpolate opening state
      openProgressRef.current += (targetOpen - openProgressRef.current) * 0.08;
      const openProgress = openProgressRef.current;

      // 1. Pivot front and back shells around the bottom hinge
      // At openProgress = 1, front pivot rotates +30 degrees, back pivot rotates -30 degrees
      const maxHingeRad = THREE.MathUtils.degToRad(35);
      frontPivot.rotation.x = openProgress * maxHingeRad;
      backPivot.rotation.x = -openProgress * maxHingeRad;

      // 2. Scale and adjust accordion dividers
      // As the case opens, the accordion stretches along the Z-axis
      accordionPockets.forEach((pocket, idx) => {
        // Stretches their stacks
        const originalZ = (idx - (numFolds - 1) / 2) * 0.12;
        const expandedZ = (idx - (numFolds - 1) / 2) * 0.35; // Expand distance
        pocket.position.z = THREE.MathUtils.lerp(originalZ, expandedZ, openProgress);

        // Subtly rotate pocket segments to fan them out
        const fanFactor = (idx - (numFolds - 1) / 2) * 0.08;
        pocket.rotation.x = fanFactor * openProgress;
      });

      // 3. Slide cards up when open
      cards.forEach((card, idx) => {
        const originalZ = (idx - 1.5) * 0.16;
        const expandedZ = (idx - 1.5) * 0.38;
        card.position.z = THREE.MathUtils.lerp(originalZ, expandedZ, openProgress);

        // Slide the 2nd card out slightly to demonstrate "Everyday Carry Friendly" action
        if (idx === 1 && openProgress > 0.4) {
          const slideOut = (openProgress - 0.4) * 1.5; // Slide up Y axis
          card.position.y = slideOut;
          card.rotation.z = Math.sin(elapsedTime * 2) * 0.03 * slideOut;
        } else {
          card.position.y = 0;
        }
      });

      // --- SECTION-SPECIFIC POSE / CAMERA TRANSITIONS ---
      // Apply different poses based on active page sections
      if (walletSystem) {
        // Let's create transition targets
        let targetX = 0;
        let yFloatingOffset = Math.sin(elapsedTime * 1.5) * 0.18; // Organic hovering
        let targetScale = 1;
        let rotSpeed = 0.1;

        if (forceOpen) {
          // Dedicated fanned-open interior accordion system showcase
          targetX = 0;
          yFloatingOffset = Math.sin(elapsedTime * 1.3) * 0.25; // Continuous elegant luxury floating
          targetScale = 1.12; // Emphasize internal accordion details and cards
          if (!isUserRotating) {
            walletSystem.rotation.y = elapsedTime * 0.24 + rotationOffset.current; // Slow continuous premium 360 rotation
            walletSystem.rotation.x = 0.52 + Math.sin(elapsedTime * 0.7) * 0.08; // Tilted downward so you can look directly INSIDE the accordion vaults!
            walletSystem.rotation.z = Math.cos(elapsedTime * 0.5) * 0.06;
          }
        } else if (autoRotateOnly) {
          // Stanadalone automatic luxury showcase
          targetX = 0;
          yFloatingOffset = Math.sin(elapsedTime * 1.2) * 0.22; // Soft floating
          targetScale = 1.05;
          if (!isUserRotating) {
            walletSystem.rotation.y = elapsedTime * 0.22 + rotationOffset.current; // Slow, automatic continuous 360-degree rotation
            walletSystem.rotation.x = 0.3 + Math.sin(elapsedTime * 0.6) * 0.1; // Elegant slight bobbing
            walletSystem.rotation.z = Math.cos(elapsedTime * 0.4) * 0.05; // Subtle side tilt
          }
        } else if (sectionIndex === 0) {
          // Hero: Centered, rotating gently
          targetX = 0;
          targetScale = 1.05;
          if (!isUserRotating) {
            walletSystem.rotation.y = elapsedTime * 0.15 + rotationOffset.current;
            walletSystem.rotation.x = 0.2 + Math.sin(elapsedTime * 0.5) * 0.1;
          }
        } else if (sectionIndex === 1) {
          // Story: Positioned left, showing profile
          targetX = -1.6;
          targetScale = 0.9;
          if (!isUserRotating) {
            walletSystem.rotation.y = Math.PI / 2.3 + Math.sin(elapsedTime * 0.4) * 0.05 + rotationOffset.current;
            walletSystem.rotation.x = 0.15;
          }
        } else if (sectionIndex === 2) {
          // Showcase: Center-right, open, user interacting
          targetX = 1.4;
          targetScale = 1.1;
          if (!isUserRotating) {
            walletSystem.rotation.y = -Math.PI / 5 + Math.sin(elapsedTime * 0.6) * 0.08 + rotationOffset.current;
            walletSystem.rotation.x = 0.35 + Math.sin(elapsedTime * 0.4) * 0.05;
          }
        } else if (sectionIndex === 3) {
          // Features: Center, showing front logo and sleek details
          targetX = 0;
          targetScale = 0.95;
          if (!isUserRotating) {
            walletSystem.rotation.y = Math.sin(elapsedTime * 0.5) * 0.4 + rotationOffset.current;
            walletSystem.rotation.x = 0.1 + Math.cos(elapsedTime * 0.3) * 0.05;
          }
        } else if (sectionIndex === 5) {
          // Technical breakdown: Exploding view / disassembled or rotated
          targetX = -1.2;
          targetScale = 0.95;
          if (!isUserRotating) {
            walletSystem.rotation.y = elapsedTime * 0.35 + rotationOffset.current;
            walletSystem.rotation.x = 0.3;
          }
        } else {
          // Standard poses for other sections
          targetX = 0;
          targetScale = 1.0;
          if (!isUserRotating) {
            walletSystem.rotation.y = elapsedTime * 0.2 + rotationOffset.current;
            walletSystem.rotation.x = 0.2;
          }
        }

        // Apply interactive user rotations (if dragging)
        if (isUserRotating) {
          currentAngle.x += (targetAngle.x - currentAngle.x) * 0.15;
          currentAngle.y += (targetAngle.y - currentAngle.y) * 0.15;
          walletSystem.rotation.x = currentAngle.x;
          walletSystem.rotation.y = currentAngle.y;
        } else {
          // Reset drag angles smoothly to sync with active rotating angles so drag begins cleanly from exact current orientation
          currentAngle.x = walletSystem.rotation.x;
          currentAngle.y = walletSystem.rotation.y;
        }

        // Apply smooth positions and scales
        walletSystem.position.x += (targetX - walletSystem.position.x) * 0.06;
        walletSystem.position.y += (yFloatingOffset - walletSystem.position.y) * 0.06;
        walletSystem.scale.setScalar(
          THREE.MathUtils.lerp(walletSystem.scale.x, targetScale, 0.06)
        );
      }

      // Slowly rotate light source for gorgeous active specular highlights
      dirLight1.position.x = 5 + Math.sin(elapsedTime * 0.4) * 2;
      dirLight1.position.z = 8 + Math.cos(elapsedTime * 0.4) * 2;

      renderer.render(scene, camera);
    };

    animate();

    // --- HANDLE WINDOW RESIZE ---
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 500;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanups
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [sectionIndex, walletColor, isOpenOverride]);

  // Color change utility
  const handleColorChange = (hex: string) => {
    setWalletColor(hex);
  };

  // Drag interaction handlers to rotate the wallet with cursor
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsUserRotating(true);
    pointerStart.current = { x: e.clientX, y: e.clientY };
    
    // Capture precise actual system rotation to completely prevent jump on touch
    const currentRotX = walletGroupRef.current ? walletGroupRef.current.rotation.x : 0.3;
    const currentRotY = walletGroupRef.current ? walletGroupRef.current.rotation.y : -0.4;
    
    angleStart.current = { x: currentRotX, y: currentRotY };
    setTargetAngle({ x: currentRotX, y: currentRotY });
    setCurrentAngle({ x: currentRotX, y: currentRotY });
    
    if (canvasRef.current) {
      canvasRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isUserRotating) return;
    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;

    // Scale rotations
    setTargetAngle({
      x: angleStart.current.x + dy * 0.008,
      y: angleStart.current.y + dx * 0.008,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsUserRotating(false);
    if (canvasRef.current) {
      canvasRef.current.releasePointerCapture(e.pointerId);
    }
    
    // Save final angle into offset so auto-rotation resumes smoothly from drag position
    const currentRotY = walletGroupRef.current ? walletGroupRef.current.rotation.y : 0;
    const elapsed = clockRef.current ? clockRef.current.getElapsedTime() : 0;
    const speed = forceOpen ? 0.24 : 0.22;
    rotationOffset.current = currentRotY - elapsed * speed;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        setIsUserRotating(false);
      }}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "none" }}
        id="wallet-3d-canvas"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-obsidian-950/80 backdrop-blur-md">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-2 border-bronze-400 border-t-transparent rounded-full animate-spin" />
            <p className="font-mono text-xs text-bronze-300 tracking-widest uppercase">
              Initializing 3D Engine...
            </p>
          </div>
        </div>
      )}

      {/* Floating 3D Interaction Hints */}
      {true && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-3 pointer-events-none transition-opacity duration-300">
          <div className="px-3 py-1.5 rounded-full glass-premium text-[10px] font-mono tracking-wider uppercase flex items-center space-x-2 text-bronze-200">
            <Eye className="w-3.5 h-3.5 text-bronze-400" />
            <span>Interactive 3D Stage</span>
          </div>
          <div className="px-3 py-1.5 rounded-full glass-premium text-[10px] font-mono tracking-wider uppercase flex items-center space-x-2 text-bronze-200">
            <RotateCw className="w-3.5 h-3.5 text-bronze-400 animate-spin" style={{ animationDuration: "12s" }} />
            <span>Click & Drag to Rotate</span>
          </div>
        </div>
      )}

      {/* Luxury Color Customizer inside 3D viewer frame */}
      {sectionIndex === 2 && !autoRotateOnly && (
        <div className="absolute top-6 right-6 flex flex-col items-end space-y-3 z-30">
          <span className="font-mono text-[10px] uppercase tracking-widest text-bronze-300">
            Select Finish
          </span>
          <div className="flex space-x-2 glass p-2 rounded-full border border-bronze-500/20">
            {[
              { name: "Copper Bronze", hex: "#c59b7b" },
              { name: "Stealth Black", hex: "#1a1a1a" },
              { name: "Rose Gold", hex: "#e0a899" },
              { name: "Titanium Silver", hex: "#94a3b8" },
            ].map((col) => (
              <button
                key={col.hex}
                onClick={() => handleColorChange(col.hex)}
                className={`w-6 h-6 rounded-full border transition-all duration-300 relative ${
                  walletColor === col.hex
                    ? "scale-125 border-bronze-400 shadow-lg glow-bronze"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
                id={`finish-${col.name.toLowerCase().replace(" ", "-")}`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-bronze-400 capitalize bg-obsidian-900/60 px-2 py-0.5 rounded">
            {
              [
                { name: "Copper Bronze", hex: "#c59b7b" },
                { name: "Stealth Black", hex: "#1a1a1a" },
                { name: "Rose Gold", hex: "#e0a899" },
                { name: "Titanium Silver", hex: "#94a3b8" },
              ].find((c) => c.hex === walletColor)?.name
            }
          </span>
        </div>
      )}
    </div>
  );
}
