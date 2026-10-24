import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CinematicWorldCanvas.css'

gsap.registerPlugin(ScrollTrigger)

interface Waypoint {
  p: number
  camPos: THREE.Vector3
  lookAt: THREE.Vector3
  ambientInt: number
  sunInt: number
  accentPos: THREE.Vector3
  accentColor: number
  accentInt: number
  violetInt: number
  coreScale: number
  coreOpacity: number
  conduitGlow: number
  constellationGlow: number
  portalGlow: number
  codeTunnelGlow: number
  towersGlow: number
  podiumGlow: number
  sectionName: string
}

const WAYPOINTS: Waypoint[] = [
  // 1. Hero — Calibration Core
  {
    p: 0.0,
    camPos: new THREE.Vector3(0, 0.8, 8.0),
    lookAt: new THREE.Vector3(0, 0.3, 0),
    ambientInt: 2.5,
    sunInt: 2.8,
    accentPos: new THREE.Vector3(2.0, 2.0, 3.5),
    accentColor: 0xf5ff38,
    accentInt: 4.2,
    violetInt: 2.2,
    coreScale: 1.0,
    coreOpacity: 0.95,
    conduitGlow: 0.25,
    constellationGlow: 0.15,
    portalGlow: 0.0,
    codeTunnelGlow: 0.0,
    towersGlow: 0.0,
    podiumGlow: 0.0,
    sectionName: 'Hero Calibration',
  },
  // 2. Student Queries — Telemetry Corridor
  {
    p: 0.14,
    camPos: new THREE.Vector3(-0.9, 0.4, 7.6),
    lookAt: new THREE.Vector3(0.0, 0.2, 0),
    ambientInt: 2.4,
    sunInt: 2.6,
    accentPos: new THREE.Vector3(-1.8, 1.2, 2.5),
    accentColor: 0xf5ff38,
    accentInt: 4.4,
    violetInt: 2.8,
    coreScale: 0.82,
    coreOpacity: 0.7,
    conduitGlow: 0.9,
    constellationGlow: 0.25,
    portalGlow: 0.1,
    codeTunnelGlow: 0.0,
    towersGlow: 0.0,
    podiumGlow: 0.0,
    sectionName: 'Placement Guidance',
  },
  // 3. Company Constellation — Galactic Recruiter Sphere
  {
    p: 0.26,
    camPos: new THREE.Vector3(0.6, 1.2, 8.2),
    lookAt: new THREE.Vector3(0, 0.3, 0),
    ambientInt: 2.2,
    sunInt: 2.4,
    accentPos: new THREE.Vector3(0.0, 2.5, 3.0),
    accentColor: 0x8875ff,
    accentInt: 4.6,
    violetInt: 4.0,
    coreScale: 0.55,
    coreOpacity: 0.4,
    conduitGlow: 0.4,
    constellationGlow: 0.95,
    portalGlow: 0.1,
    codeTunnelGlow: 0.0,
    towersGlow: 0.0,
    podiumGlow: 0.0,
    sectionName: 'Recruiter Constellation',
  },
  // 4. Interview Worry Solver — Clarity Portal
  {
    p: 0.38,
    camPos: new THREE.Vector3(0.8, -0.2, 7.4),
    lookAt: new THREE.Vector3(0.0, 0.1, 0),
    ambientInt: 2.3,
    sunInt: 2.2,
    accentPos: new THREE.Vector3(1.5, 0.8, 3.0),
    accentColor: 0x8875ff,
    accentInt: 3.8,
    violetInt: 4.5,
    coreScale: 0.45,
    coreOpacity: 0.3,
    conduitGlow: 0.2,
    constellationGlow: 0.3,
    portalGlow: 0.9,
    codeTunnelGlow: 0.1,
    towersGlow: 0.0,
    podiumGlow: 0.0,
    sectionName: 'Worry Resolution',
  },
  // 5. Question Lab — High-Speed Code Stream
  {
    p: 0.50,
    camPos: new THREE.Vector3(0.0, 0.0, 7.0),
    lookAt: new THREE.Vector3(0, 0.0, -1.0),
    ambientInt: 2.2,
    sunInt: 2.6,
    accentPos: new THREE.Vector3(0.0, 1.2, 2.5),
    accentColor: 0xf5ff38,
    accentInt: 4.8,
    violetInt: 3.2,
    coreScale: 0.35,
    coreOpacity: 0.2,
    conduitGlow: 0.4,
    constellationGlow: 0.2,
    portalGlow: 0.2,
    codeTunnelGlow: 0.85,
    towersGlow: 0.2,
    podiumGlow: 0.0,
    sectionName: 'Question Bank',
  },
  // 6. Career Tracks — Elevation Pedestals
  {
    p: 0.63,
    camPos: new THREE.Vector3(-0.8, 1.4, 7.8),
    lookAt: new THREE.Vector3(0.0, 0.6, 0),
    ambientInt: 2.4,
    sunInt: 2.8,
    accentPos: new THREE.Vector3(-1.0, 2.2, 3.0),
    accentColor: 0xf5ff38,
    accentInt: 4.2,
    violetInt: 2.8,
    coreScale: 0.3,
    coreOpacity: 0.2,
    conduitGlow: 0.2,
    constellationGlow: 0.15,
    portalGlow: 0.0,
    codeTunnelGlow: 0.2,
    towersGlow: 0.9,
    podiumGlow: 0.1,
    sectionName: 'Placement Tracks',
  },
  // 7. Colleges & MOU — Institutional Nexus
  {
    p: 0.74,
    camPos: new THREE.Vector3(0.9, 0.8, 8.0),
    lookAt: new THREE.Vector3(0.0, 0.4, 0),
    ambientInt: 2.5,
    sunInt: 2.7,
    accentPos: new THREE.Vector3(1.8, 1.6, 3.2),
    accentColor: 0x8875ff,
    accentInt: 3.8,
    violetInt: 3.5,
    coreScale: 0.32,
    coreOpacity: 0.2,
    conduitGlow: 0.25,
    constellationGlow: 0.25,
    portalGlow: 0.15,
    codeTunnelGlow: 0.1,
    towersGlow: 0.4,
    podiumGlow: 0.2,
    sectionName: 'For Colleges',
  },
  // 8. Pricing — Ultra-Stable Studio Platform
  {
    p: 0.84,
    camPos: new THREE.Vector3(0.0, 0.3, 7.5),
    lookAt: new THREE.Vector3(0.0, 0.2, 0),
    ambientInt: 2.6,
    sunInt: 2.9,
    accentPos: new THREE.Vector3(0.0, 1.8, 3.0),
    accentColor: 0xf5ff38,
    accentInt: 4.0,
    violetInt: 2.2,
    coreScale: 0.35,
    coreOpacity: 0.25,
    conduitGlow: 0.1,
    constellationGlow: 0.1,
    portalGlow: 0.0,
    codeTunnelGlow: 0.0,
    towersGlow: 0.2,
    podiumGlow: 0.2,
    sectionName: 'Transparent Pricing',
  },
  // 9. Leaderboard — Champion Podiums
  {
    p: 0.92,
    camPos: new THREE.Vector3(0.0, 1.0, 7.4),
    lookAt: new THREE.Vector3(0.0, 0.5, 0),
    ambientInt: 2.5,
    sunInt: 2.8,
    accentPos: new THREE.Vector3(0.0, 2.2, 2.8),
    accentColor: 0xf5ff38,
    accentInt: 4.6,
    violetInt: 3.2,
    coreScale: 0.4,
    coreOpacity: 0.3,
    conduitGlow: 0.15,
    constellationGlow: 0.15,
    portalGlow: 0.05,
    codeTunnelGlow: 0.05,
    towersGlow: 0.2,
    podiumGlow: 0.9,
    sectionName: 'XP Leaderboard',
  },
  // 10. Horizon & Final CTA — Panoramic Vista
  {
    p: 1.0,
    camPos: new THREE.Vector3(0.0, 0.6, 8.4),
    lookAt: new THREE.Vector3(0.0, 0.1, 0),
    ambientInt: 2.5,
    sunInt: 2.9,
    accentPos: new THREE.Vector3(0.0, 2.0, 3.5),
    accentColor: 0xf5ff38,
    accentInt: 4.5,
    violetInt: 2.8,
    coreScale: 0.5,
    coreOpacity: 0.4,
    conduitGlow: 0.3,
    constellationGlow: 0.4,
    portalGlow: 0.2,
    codeTunnelGlow: 0.1,
    towersGlow: 0.3,
    podiumGlow: 0.4,
    sectionName: 'Career Engine',
  },
]

function interpolateWaypoints(p: number): Waypoint {
  const clamped = Math.max(0, Math.min(1, p))
  if (clamped <= WAYPOINTS[0].p) return WAYPOINTS[0]
  if (clamped >= WAYPOINTS[WAYPOINTS.length - 1].p) return WAYPOINTS[WAYPOINTS.length - 1]

  let i0 = 0
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    if (clamped >= WAYPOINTS[i].p && clamped <= WAYPOINTS[i + 1].p) {
      i0 = i
      break
    }
  }
  const w0 = WAYPOINTS[i0]
  const w1 = WAYPOINTS[i0 + 1]
  const t = (clamped - w0.p) / (w1.p - w0.p)
  // Smooth cubic easeInOut for fluid cinematic motion
  const ease = t * t * (3 - 2 * t)

  return {
    p: clamped,
    camPos: new THREE.Vector3().lerpVectors(w0.camPos, w1.camPos, ease),
    lookAt: new THREE.Vector3().lerpVectors(w0.lookAt, w1.lookAt, ease),
    ambientInt: THREE.MathUtils.lerp(w0.ambientInt, w1.ambientInt, ease),
    sunInt: THREE.MathUtils.lerp(w0.sunInt, w1.sunInt, ease),
    accentPos: new THREE.Vector3().lerpVectors(w0.accentPos, w1.accentPos, ease),
    accentColor: w0.accentColor,
    accentInt: THREE.MathUtils.lerp(w0.accentInt, w1.accentInt, ease),
    violetInt: THREE.MathUtils.lerp(w0.violetInt, w1.violetInt, ease),
    coreScale: THREE.MathUtils.lerp(w0.coreScale, w1.coreScale, ease),
    coreOpacity: THREE.MathUtils.lerp(w0.coreOpacity, w1.coreOpacity, ease),
    conduitGlow: THREE.MathUtils.lerp(w0.conduitGlow, w1.conduitGlow, ease),
    constellationGlow: THREE.MathUtils.lerp(w0.constellationGlow, w1.constellationGlow, ease),
    portalGlow: THREE.MathUtils.lerp(w0.portalGlow, w1.portalGlow, ease),
    codeTunnelGlow: THREE.MathUtils.lerp(w0.codeTunnelGlow, w1.codeTunnelGlow, ease),
    towersGlow: THREE.MathUtils.lerp(w0.towersGlow, w1.towersGlow, ease),
    podiumGlow: THREE.MathUtils.lerp(w0.podiumGlow, w1.podiumGlow, ease),
    sectionName: ease < 0.5 ? w0.sectionName : w1.sectionName,
  }
}

export default function CinematicWorldCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState('Hero Calibration Core')
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    let W = window.innerWidth
    let H = window.innerHeight

    // ── 1. WebGL Renderer with High-Key Studio Finish ─────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.18
    renderer.shadowMap.enabled = !isMobile
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    // ── 2. Master Scene & Camera ──────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100)
    camera.position.copy(WAYPOINTS[0].camPos)
    camera.lookAt(WAYPOINTS[0].lookAt)

    const masterWorld = new THREE.Group()
    scene.add(masterWorld)

    // ── 3. High-Key Studio & Cinematic Lighting ───────────────────
    const ambientLight = new THREE.AmbientLight(0xfffdf5, 2.4)
    scene.add(ambientLight)

    const keySun = new THREE.DirectionalLight(0xffffff, 2.8)
    keySun.position.set(6, 12, 8)
    keySun.castShadow = !isMobile
    scene.add(keySun)

    const accentYellowLight = new THREE.PointLight(0xf5ff38, 4.5, 16, 1.2)
    accentYellowLight.position.set(2.5, 2.5, 3.5)
    scene.add(accentYellowLight)

    const accentVioletLight = new THREE.PointLight(0x8875ff, 3.2, 14, 1.2)
    accentVioletLight.position.set(-3.5, 1.5, 2.0)
    scene.add(accentVioletLight)

    // ── 4. GEOMETRIC ASSET 1: Quantum Calibration Core (Hero) ──────
    const coreGroup = new THREE.Group()
    masterWorld.add(coreGroup)

    // Sculptural frosted ceramic icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(0.9, isMobile ? 1 : 2)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.35,
      thickness: 0.6,
      transparent: true,
      opacity: 0.95,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreMesh.castShadow = !isMobile
    coreGroup.add(coreMesh)

    // Inner glowing electric yellow energy core
    const innerCoreGeo = new THREE.OctahedronGeometry(0.5, 0)
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xf5ff38,
      emissive: 0xf5ff38,
      emissiveIntensity: 1.2,
      roughness: 0.15,
      metalness: 0.2,
    })
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat)
    coreGroup.add(innerCore)

    // Violet wireframe lattice cage
    const wireGeo = new THREE.IcosahedronGeometry(1.15, 1)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x8875ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    coreGroup.add(wireMesh)

    // Three Gyroscopic Gimbal Rings
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xf5ff38,
      emissive: 0xf5ff38,
      emissiveIntensity: 0.6,
      metalness: 0.8,
      roughness: 0.2,
    })
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x17191c,
      metalness: 0.7,
      roughness: 0.3,
    })
    const ringGeo1 = new THREE.TorusGeometry(1.4, 0.025, 12, 48)
    const ringGeo2 = new THREE.TorusGeometry(1.7, 0.02, 12, 48)
    const ringGeo3 = new THREE.TorusGeometry(2.0, 0.018, 12, 48)

    const ring1 = new THREE.Mesh(ringGeo1, ringMat1)
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2)
    const ring3 = new THREE.Mesh(ringGeo3, ringMat1)
    coreGroup.add(ring1, ring2, ring3)

    // ── 5. GEOMETRIC ASSET 2: Telemetry Highway & Conduits ────────
    const conduitGroup = new THREE.Group()
    masterWorld.add(conduitGroup)

    const conduitMat = new THREE.MeshStandardMaterial({
      color: 0xf5ff38,
      emissive: 0xf5ff38,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7,
    })

    // S-curve highway conduit traversing through space
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-6, -2.5, -4),
      new THREE.Vector3(-3.5, -1.8, 1),
      new THREE.Vector3(-1.5, -1.2, 4),
      new THREE.Vector3(1.5, -1.5, 3),
      new THREE.Vector3(4.5, -2.0, -1),
    ])
    const tubeGeo1 = new THREE.TubeGeometry(curve1, 40, 0.04, 8, false)
    const tube1 = new THREE.Mesh(tubeGeo1, conduitMat)
    conduitGroup.add(tube1)

    // Floor grid plane with warm subtle tech aesthetic
    const gridHelper = new THREE.GridHelper(30, 30, 0xf5ff38, 0x17191c)
    gridHelper.position.y = -2.6
    const gridMat = gridHelper.material as THREE.Material
    gridMat.transparent = true
    gridMat.opacity = 0.12
    masterWorld.add(gridHelper)

    // ── 6. GEOMETRIC ASSET 3: Placement Constellation Galaxy ──────
    const constellationGroup = new THREE.Group()
    masterWorld.add(constellationGroup)

    const companyStars: THREE.Mesh[] = []
    const starGeo = new THREE.SphereGeometry(0.12, 12, 12)
    const starColors = [0xf5ff38, 0x8875ff, 0xff7a29, 0xffffff]

    // Create 18 company star nodes
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2
      const radius = 3.2 + Math.sin(i * 1.5) * 1.2
      const y = -0.5 + Math.cos(i * 2.2) * 1.8
      const col = starColors[i % starColors.length]

      const starMat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.9,
        roughness: 0.1,
      })
      const star = new THREE.Mesh(starGeo, starMat)
      star.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius)
      constellationGroup.add(star)
      companyStars.push(star)
    }

    // Connect nearest neighbor stars with delicate luminous lines
    const linePoints: THREE.Vector3[] = []
    for (let i = 0; i < companyStars.length; i++) {
      for (let j = i + 1; j < companyStars.length; j++) {
        const d = companyStars[i].position.distanceTo(companyStars[j].position)
        if (d < 3.2) {
          linePoints.push(companyStars[i].position, companyStars[j].position)
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints)
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x8875ff,
      transparent: true,
      opacity: 0.35,
    })
    const constellationLines = new THREE.LineSegments(lineGeo, lineMat)
    constellationGroup.add(constellationLines)

    // ── 7. GEOMETRIC ASSET 4: Serene Clarity Portal (Worry Solver) ──
    const portalGroup = new THREE.Group()
    portalGroup.position.set(2.2, -0.6, 1.5)
    masterWorld.add(portalGroup)

    const portalFrameGeo = new THREE.TorusGeometry(1.6, 0.05, 16, 64)
    const portalFrameMat = new THREE.MeshStandardMaterial({
      color: 0x8875ff,
      emissive: 0x8875ff,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
    })
    const portalRing = new THREE.Mesh(portalFrameGeo, portalFrameMat)
    portalGroup.add(portalRing)

    // ── 8. GEOMETRIC ASSET 5: Career Elevation Pedestals (Tracks) ──
    const towersGroup = new THREE.Group()
    towersGroup.position.set(-1.8, -1.8, 0.5)
    masterWorld.add(towersGroup)

    const towerHeights = [0.8, 1.4, 2.0, 2.6, 3.4]
    const towerMeshes: THREE.Mesh[] = []

    for (let i = 0; i < 5; i++) {
      const h = towerHeights[i]
      const boxGeo = new THREE.BoxGeometry(0.5, h, 0.5)
      const isTop = i === 4
      const boxMat = new THREE.MeshStandardMaterial({
        color: isTop ? 0xf5ff38 : 0xffffff,
        emissive: isTop ? 0xf5ff38 : 0x8875ff,
        emissiveIntensity: isTop ? 0.6 : 0.2,
        roughness: 0.2,
        metalness: 0.4,
        transparent: true,
        opacity: 0.85,
      })
      const tower = new THREE.Mesh(boxGeo, boxMat)
      tower.position.set(i * 0.7 - 1.4, h / 2, 0)
      towersGroup.add(tower)
      towerMeshes.push(tower)
    }

    // ── 9. GEOMETRIC ASSET 6: Top 3 Champion Podiums (Leaderboard) ──
    const podiumGroup = new THREE.Group()
    podiumGroup.position.set(0, -1.5, 0.8)
    masterWorld.add(podiumGroup)

    const podiumData = [
      { x: -0.9, h: 1.4, col: 0xe0e4e8, rank: 'Silver' },
      { x: 0.0, h: 2.1, col: 0xf5ff38, rank: 'Gold' },
      { x: 0.9, h: 1.0, col: 0xff7a29, rank: 'Bronze' },
    ]

    podiumData.forEach(p => {
      const pGeo = new THREE.CylinderGeometry(0.38, 0.42, p.h, 24)
      const pMat = new THREE.MeshStandardMaterial({
        color: p.col,
        emissive: p.col,
        emissiveIntensity: 0.5,
        roughness: 0.2,
        metalness: 0.6,
      })
      const mesh = new THREE.Mesh(pGeo, pMat)
      mesh.position.set(p.x, p.h / 2, 0)
      podiumGroup.add(mesh)
    })

    // ── 10. Atmospheric Constellation Dust Field (600 Particles) ───
    const particleCount = isMobile ? 250 : 600
    const particleGeo = new THREE.BufferGeometry()
    const particlePos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3 + 0] = (Math.random() - 0.5) * 26
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 16
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 24
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0xf5ff38,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    })
    const particleField = new THREE.Points(particleGeo, particleMat)
    masterWorld.add(particleField)

    // ── 11. GSAP ScrollTrigger Integration ────────────────────────
    let currentP = 0
    let targetP = 0

    // Master ScrollTrigger tracking total scroll progress of the page
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: self => {
        targetP = self.progress
        setScrollPct(Math.round(self.progress * 100))
      },
    })

    // ── 12. Main Render Loop with Smooth Damped Camera Interpolation
    let animId = 0
    let clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Smooth lag dampening on scroll progress
      if (!prefersReducedMotion) {
        currentP += (targetP - currentP) * 0.08
      } else {
        currentP = targetP
      }

      // Interpolate cinematic camera and environmental state
      const state = interpolateWaypoints(currentP)
      setActiveSection(state.sectionName)

      if (!prefersReducedMotion) {
        camera.position.lerp(state.camPos, 0.08)
        camera.lookAt(state.lookAt)
      }

      // Lighting updates
      ambientLight.intensity = state.ambientInt
      keySun.intensity = state.sunInt
      accentYellowLight.position.lerp(state.accentPos, 0.08)
      accentYellowLight.color.setHex(state.accentColor)
      accentYellowLight.intensity = state.accentInt
      accentVioletLight.intensity = state.violetInt

      // Core idle animation + scroll responsiveness
      coreMesh.rotation.y = time * 0.25 + currentP * Math.PI * 3
      coreMesh.rotation.x = Math.sin(time * 0.18) * 0.2
      innerCore.rotation.y = -time * 0.4
      wireMesh.rotation.z = time * 0.15

      ring1.rotation.x = time * 0.5 + currentP * 2
      ring1.rotation.y = time * 0.3
      ring2.rotation.y = time * 0.4 + currentP * -2
      ring2.rotation.z = time * 0.2
      ring3.rotation.z = time * 0.35 + currentP * 3

      coreGroup.scale.setScalar(state.coreScale)
      coreMat.opacity = state.coreOpacity

      // Constellation idle rotation
      constellationGroup.rotation.y = time * 0.08 + currentP * Math.PI * 2
      lineMat.opacity = THREE.MathUtils.lerp(0.15, 0.65, state.constellationGlow)

      // Portal rotation & pulse
      portalRing.rotation.z = time * 0.3
      portalGroup.scale.setScalar(0.7 + state.portalGlow * 0.5)

      // Dust particle gentle drift
      particleField.rotation.y = time * 0.02
      particleField.position.y = Math.sin(time * 0.1) * 0.1

      renderer.render(scene, camera)
    }

    animate()

    // ── 13. Responsive Window Resize Handler ───────────────────────
    const handleResize = () => {
      W = window.innerWidth
      H = window.innerHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    // ── 14. Cleanup & Resource Disposal ───────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      st.kill()

      // Dispose Three.js GPU resources
      renderer.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      innerCoreGeo.dispose()
      innerCoreMat.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      ringGeo1.dispose()
      ringGeo2.dispose()
      ringGeo3.dispose()
      ringMat1.dispose()
      ringMat2.dispose()
      tubeGeo1.dispose()
      conduitMat.dispose()
      starGeo.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      portalFrameGeo.dispose()
      portalFrameMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()

      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <>
      {/* Restrained Top Page Scroll Progress Bar */}
      <div
        className="scroll-progress-line"
        style={{ width: `${scrollPct}%` }}
        aria-hidden="true"
      />

      <div className="cinematic-world" aria-hidden="true">
        {/* Three.js full-screen fixed WebGL canvas container */}
        <div ref={mountRef} className="cinematic-world__canvas" />

        {/* Subtle telemetry indicator at screen bottom-right */}
        <div className="cinematic-world__hud" role="status" aria-label="Cinematic Navigation Telemetry">
          <div className="hud-pulse" />
          <span className="hud-phase">{activeSection}</span>
          <span className="hud-pct">{scrollPct}%</span>
        </div>
      </div>
    </>
  )
}
