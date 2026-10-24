import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

export interface CareerTierData {
  id: string
  title: string
  companyGroup: string
  salary: string
  problemName: string
  complexity: string
  testsPassed: string
  focusTopics: string
  questionCount: number
  accentColor: string
  tierLevel: 'super-dream' | 'cloud' | 'service'
  posOffset: { x: number; y: number; z: number }
}

const CAREER_TIERS: CareerTierData[] = [
  {
    id: 'super-dream',
    title: 'Super-Dream Tier',
    companyGroup: 'Google · Amazon · Microsoft',
    salary: '₹20 – ₹42+ LPA',
    problemName: 'Distributed Cache & Graph DP',
    complexity: 'Time: O(N log N) · Space: O(N)',
    testsPassed: '14/14 Passed · 1.8ms',
    focusTopics: 'Trees, Graphs, Segment Trees, System Design',
    questionCount: 420,
    accentColor: '#F5FF38', // Electric yellow
    tierLevel: 'super-dream',
    posOffset: { x: 2.1, y: 1.1, z: 0.2 },
  },
  {
    id: 'cloud',
    title: 'Enterprise Cloud Tier',
    companyGroup: 'ServiceNow · Salesforce · Oracle',
    salary: '₹10 – ₹20 LPA',
    problemName: 'Concurrent Event Pipeline',
    complexity: 'Time: O(N) · Space: O(1)',
    testsPassed: '12/12 Passed · 2.4ms',
    focusTopics: 'Microservices, Concurrency, Hash Indexes',
    questionCount: 310,
    accentColor: '#8875FF', // Electric violet
    tierLevel: 'cloud',
    posOffset: { x: 2.3, y: -0.1, z: 0.5 },
  },
  {
    id: 'service',
    title: 'Prime MNC Tier',
    companyGroup: 'TCS Digital · Infosys SP · Wipro Turbo',
    salary: '₹3 – ₹11.5 LPA',
    problemName: 'Advanced CodeVita Matrix Flow',
    complexity: 'Time: O(M×N) · Space: O(1)',
    testsPassed: '10/10 Passed · 3.1ms',
    focusTopics: 'Dynamic Programming, Strings, Quantitative',
    questionCount: 510,
    accentColor: '#FF7A29', // Orange flame
    tierLevel: 'service',
    posOffset: { x: 1.9, y: -1.3, z: 0.1 },
  },
]

interface Props {
  activeTrackId?: string
  onSelectTier?: (tierId: string) => void
}

export default function CareerStudioCanvas({
  activeTrackId = 'all',
  onSelectTier,
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [hoveredTier, setHoveredTier] = useState<CareerTierData | null>(null)
  const [selectedTier, setSelectedTier] = useState<CareerTierData | null>(null)
  const [hudPos, setHudPos] = useState<{ x: number; y: number } | null>(null)
  const [fpsText, setFpsText] = useState('60 FPS')

  const activeTrackRef = useRef(activeTrackId)
  useEffect(() => {
    activeTrackRef.current = activeTrackId
    if (activeTrackId !== 'all') {
      const match = CAREER_TIERS.find(t => t.id === activeTrackId)
      if (match) setSelectedTier(match)
    } else {
      setSelectedTier(null)
    }
  }, [activeTrackId])

  const handleCanvasClick = useCallback(() => {
    if (hoveredTier) {
      setSelectedTier(prev => (prev?.id === hoveredTier.id ? null : hoveredTier))
      onSelectTier?.(hoveredTier.id)
    }
  }, [hoveredTier, onSelectTier])

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let isDisposed = false
    let animationFrameId = 0
    let lastTime = performance.now()
    let frameCount = 0

    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const W = el.clientWidth || 600
    const H = el.clientHeight || 520

    // ── WebGL Renderer with High-Key Studio Lighting ───────────
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    // ── Scene & Camera ──────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100)
    camera.position.set(0, 0.3, 7.2)
    camera.lookAt(0, 0, 0)

    const studioGroup = new THREE.Group()
    scene.add(studioGroup)

    // ── High-End Studio Lighting ───────────────────────────────
    const ambientLight = new THREE.AmbientLight(0xfffdf5, 2.4)
    scene.add(ambientLight)

    const keySun = new THREE.DirectionalLight(0xffffff, 2.6)
    keySun.position.set(5, 8, 7)
    keySun.castShadow = true
    scene.add(keySun)

    const fillWarm = new THREE.DirectionalLight(0xf5ff38, 1.4)
    fillWarm.position.set(-5, -2, 4)
    scene.add(fillWarm)

    const violetRim = new THREE.PointLight(0x8875ff, 3.2, 12, 1.2)
    violetRim.position.set(-3.5, 2.5, 2)
    scene.add(violetRim)

    const yellowSpot = new THREE.PointLight(0xf5ff38, 4.0, 10, 1.2)
    yellowSpot.position.set(2, 2.5, 3)
    scene.add(yellowSpot)

    // ── 1. CENTRAL ENGINE: Luminous Readiness Calibration Core ───
    const coreGroup = new THREE.Group()
    coreGroup.position.set(-0.15, 0, 0)
    studioGroup.add(coreGroup)

    // Sculptural frosted ceramic icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(0.72, 2)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.12,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.25,
      thickness: 0.5,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreMesh.castShadow = true
    coreGroup.add(coreMesh)

    // Inner glowing electric yellow energy core
    const innerCoreGeo = new THREE.OctahedronGeometry(0.42, 0)
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0xf5ff38,
      emissive: 0xf5ff38,
      emissiveIntensity: 1.0,
      roughness: 0.2,
      metalness: 0.3,
    })
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat)
    coreGroup.add(innerCore)

    // Violet wireframe lattice cage
    const wireGeo = new THREE.IcosahedronGeometry(0.88, 1)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x8875ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    coreGroup.add(wireMesh)

    // Equatorial calibration ring in electric yellow
    const ringGeo = new THREE.TorusGeometry(1.05, 0.024, 16, 80)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf5ff38,
      emissive: 0xf5ff38,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.3,
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = Math.PI / 2
    coreGroup.add(ringMesh)

    // Secondary tilted gimbal ring in graphite
    const gimbalGeo = new THREE.TorusGeometry(1.22, 0.018, 16, 80)
    const gimbalMat = new THREE.MeshStandardMaterial({
      color: 0x22262c,
      roughness: 0.4,
      metalness: 0.6,
    })
    const gimbalMesh = new THREE.Mesh(gimbalGeo, gimbalMat)
    gimbalMesh.rotation.x = Math.PI / 3.2
    gimbalMesh.rotation.y = Math.PI / 5
    coreGroup.add(gimbalMesh)

    // ── 2. LEFT COMPILER SLAB: Dimensional Code Execution ─────────
    const slabGroup = new THREE.Group()
    slabGroup.position.set(-2.55, 0.1, 0.4)
    slabGroup.rotation.y = 0.38
    slabGroup.rotation.x = -0.06
    studioGroup.add(slabGroup)

    // Glass compiler backplate with dark charcoal rim
    const slabGeo = new THREE.BoxGeometry(1.85, 2.5, 0.08)
    const slabMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 0.9,
      transmission: 0.35,
      thickness: 0.3,
    })
    const slabMesh = new THREE.Mesh(slabGeo, slabMat)
    slabMesh.castShadow = true
    slabGroup.add(slabMesh)

    // Compiler Header Bar
    const headerGeo = new THREE.BoxGeometry(1.75, 0.28, 0.09)
    const headerMat = new THREE.MeshStandardMaterial({
      color: 0x17191c,
      roughness: 0.3,
    })
    const headerMesh = new THREE.Mesh(headerGeo, headerMat)
    headerMesh.position.set(0, 1.05, 0.01)
    slabGroup.add(headerMesh)

    // Header traffic lights (Red, Yellow, Green dots)
    const dotColors = [0xff5f56, 0xffbd2e, 0x27c93f]
    dotColors.forEach((col, i) => {
      const dotGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.11, 16)
      const dotMat = new THREE.MeshBasicMaterial({ color: col })
      const dot = new THREE.Mesh(dotGeo, dotMat)
      dot.rotation.x = Math.PI / 2
      dot.position.set(-0.7 + i * 0.12, 1.05, 0.02)
      slabGroup.add(dot)
    })

    // Monaco syntax code bars (Dimensional glowing syntax lines)
    interface CodeBarSpec {
      y: number
      width: number
      x: number
      color: number
    }
    const codeLines: CodeBarSpec[] = [
      { y: 0.72, width: 0.5,  x: -0.45, color: 0x8875ff }, // def solve(nums):
      { y: 0.52, width: 0.85, x: -0.22, color: 0x17191c }, //   heap = []
      { y: 0.34, width: 1.15, x: -0.05, color: 0xf5ff38 }, //   for n in nums: heapq.push(n)
      { y: 0.16, width: 0.95, x: -0.15, color: 0x17191c }, //   # AST Big-O verify
      { y: -0.02, width: 1.25, x: 0.0,  color: 0x8875ff }, //   return max_path(heap)
      { y: -0.20, width: 0.65, x: -0.32, color: 0x17191c }, // Execution telemetry
    ]

    codeLines.forEach(line => {
      const barGeo = new THREE.BoxGeometry(line.width, 0.075, 0.1)
      const barMat = new THREE.MeshStandardMaterial({
        color: line.color,
        emissive: line.color === 0xf5ff38 ? 0xf5ff38 : line.color === 0x8875ff ? 0x8875ff : 0x000000,
        emissiveIntensity: line.color === 0xf5ff38 ? 0.6 : line.color === 0x8875ff ? 0.4 : 0.0,
        roughness: 0.3,
      })
      const bar = new THREE.Mesh(barGeo, barMat)
      bar.position.set(line.x, line.y, 0.02)
      slabGroup.add(bar)
    })

    // AST Complexity Badge Slab: O(N log N)
    const astBadgeGeo = new THREE.BoxGeometry(1.5, 0.26, 0.09)
    const astBadgeMat = new THREE.MeshStandardMaterial({
      color: 0x17191c,
      roughness: 0.3,
    })
    const astBadge = new THREE.Mesh(astBadgeGeo, astBadgeMat)
    astBadge.position.set(0, -0.55, 0.02)
    slabGroup.add(astBadge)

    // Testcases Passed Pill: 12/12 Passed in Neon Green
    const testPillGeo = new THREE.BoxGeometry(1.5, 0.28, 0.1)
    const testPillMat = new THREE.MeshStandardMaterial({
      color: 0x27c93f,
      emissive: 0x27c93f,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    })
    const testPill = new THREE.Mesh(testPillGeo, testPillMat)
    testPill.position.set(0, -0.92, 0.02)
    slabGroup.add(testPill)

    // ── 3. RIGHT CAREER TIERS: Dimensional Physical Target Cards ─
    interface TierCardMesh {
      data: CareerTierData
      group: THREE.Group
      backplate: THREE.Mesh
      indicator: THREE.Mesh
      basePos: THREE.Vector3
      targetScale: number
      currentScale: number
      targetZ: number
      currentZ: number
    }

    const tierCards: TierCardMesh[] = []
    const raycastTargets: THREE.Object3D[] = []

    CAREER_TIERS.forEach(tier => {
      const cardGroup = new THREE.Group()
      cardGroup.position.set(tier.posOffset.x, tier.posOffset.y, tier.posOffset.z)
      cardGroup.rotation.y = -0.28
      studioGroup.add(cardGroup)

      // Physical ceramic card plate
      const cardGeo = new THREE.BoxGeometry(2.0, 0.88, 0.08)
      const cardMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.1,
      })
      const cardMesh = new THREE.Mesh(cardGeo, cardMat)
      cardMesh.castShadow = true
      cardMesh.userData = { tierId: tier.id, data: tier }
      cardGroup.add(cardMesh)
      raycastTargets.push(cardMesh)

      // Left vertical accent stripe
      const stripeGeo = new THREE.BoxGeometry(0.1, 0.82, 0.1)
      const stripeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(tier.accentColor),
        emissive: new THREE.Color(tier.accentColor),
        emissiveIntensity: 0.8,
        roughness: 0.2,
      })
      const stripe = new THREE.Mesh(stripeGeo, stripeMat)
      stripe.position.set(-0.9, 0, 0.02)
      cardGroup.add(stripe)

      // Top company group title bar
      const titleBarGeo = new THREE.BoxGeometry(1.3, 0.12, 0.09)
      const titleBarMat = new THREE.MeshStandardMaterial({
        color: 0x17191c,
        roughness: 0.3,
      })
      const titleBar = new THREE.Mesh(titleBarGeo, titleBarMat)
      titleBar.position.set(-0.1, 0.22, 0.02)
      cardGroup.add(titleBar)

      // Salary badge bar
      const salBarGeo = new THREE.BoxGeometry(1.0, 0.14, 0.09)
      const salBarMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(tier.accentColor),
        emissive: new THREE.Color(tier.accentColor),
        emissiveIntensity: 0.5,
        roughness: 0.3,
      })
      const salBar = new THREE.Mesh(salBarGeo, salBarMat)
      salBar.position.set(-0.25, -0.05, 0.02)
      cardGroup.add(salBar)

      // Question count badge dot
      const badgeDotGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16)
      const badgeDotMat = new THREE.MeshStandardMaterial({
        color: 0x17191c,
        roughness: 0.3,
      })
      const badgeDot = new THREE.Mesh(badgeDotGeo, badgeDotMat)
      badgeDot.rotation.x = Math.PI / 2
      badgeDot.position.set(0.7, 0.22, 0.02)
      cardGroup.add(badgeDot)

      tierCards.push({
        data: tier,
        group: cardGroup,
        backplate: cardMesh,
        indicator: stripe,
        basePos: new THREE.Vector3(tier.posOffset.x, tier.posOffset.y, tier.posOffset.z),
        targetScale: 1.0,
        currentScale: 1.0,
        targetZ: tier.posOffset.z,
        currentZ: tier.posOffset.z,
      })
    })

    // ── 4. ENERGY CONDUITS: Glowing Bezier Preparation Pipelines ─
    // Curves flowing from Compiler Slab (-1.6, y, z) -> Central Core (0, 0, 0) -> Target Cards (+1.6, y, z)
    const pipelineCurves: THREE.CubicBezierCurve3[] = []
    const pipelinePointsList: Float32Array[] = []
    const pipelineCount = 3

    CAREER_TIERS.forEach(tier => {
      const pStart = new THREE.Vector3(-1.6, 0.1, 0.2)
      const pMid1 = new THREE.Vector3(-0.6, 0.4, 0.5)
      const pMid2 = new THREE.Vector3(0.6, tier.posOffset.y * 0.4, 0.4)
      const pEnd = new THREE.Vector3(tier.posOffset.x - 1.1, tier.posOffset.y, tier.posOffset.z)

      const curve = new THREE.CubicBezierCurve3(pStart, pMid1, pMid2, pEnd)
      pipelineCurves.push(curve)

      const pts = curve.getPoints(50)
      const posArray = new Float32Array(pts.length * 3)
      pts.forEach((p, i) => {
        posArray[i * 3] = p.x
        posArray[i * 3 + 1] = p.y
        posArray[i * 3 + 2] = p.z
      })
      pipelinePointsList.push(posArray)

      const pipeGeo = new THREE.BufferGeometry()
      pipeGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
      const pipeMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(tier.accentColor),
        transparent: true,
        opacity: 0.5,
      })
      const pipeLine = new THREE.Line(pipeGeo, pipeMat)
      studioGroup.add(pipeLine)
    })

    // Dynamic Flowing Data Particles traveling along the curves
    const pulseParticles: { mesh: THREE.Mesh; curveIndex: number; progress: number; speed: number }[] = []
    for (let i = 0; i < 9; i++) {
      const curveIndex = i % pipelineCount
      const col = CAREER_TIERS[curveIndex].accentColor
      const pGeo = new THREE.SphereGeometry(0.045, 12, 12)
      const pMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(col),
        emissive: new THREE.Color(col),
        emissiveIntensity: 1.6,
      })
      const pMesh = new THREE.Mesh(pGeo, pMat)
      studioGroup.add(pMesh)
      pulseParticles.push({
        mesh: pMesh,
        curveIndex,
        progress: (i / 9),
        speed: 0.28 + Math.random() * 0.15,
      })
    }

    // ── 5. Ambient Micro-Dust Sparkles ───────────────────────────
    const dustCount = isMobile ? 120 : 350
    const dustPos = new Float32Array(dustCount * 3)
    const dustColors = new Float32Array(dustCount * 3)
    const colYellow = new THREE.Color(0xf5ff38)
    const colViolet = new THREE.Color(0x8875ff)
    const colCharcoal = new THREE.Color(0xb0b8c4)

    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3]     = (Math.random() - 0.5) * 11
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 7
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6

      const r = Math.random()
      const c = r < 0.4 ? colYellow : r < 0.7 ? colViolet : colCharcoal
      dustColors[i * 3]     = c.r
      dustColors[i * 3 + 1] = c.g
      dustColors[i * 3 + 2] = c.b
    }

    const dustGeo = new THREE.BufferGeometry()
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3))
    const dustMat = new THREE.PointsMaterial({
      size: isMobile ? 0.035 : 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    })
    const dustPoints = new THREE.Points(dustGeo, dustMat)
    scene.add(dustPoints)

    // ── Mouse Parallax & Raycasting ─────────────────────────────
    const raycaster = new THREE.Raycaster()
    const mouse2D = new THREE.Vector2(-999, -999)
    let targetCamX = 0
    let targetCamY = 0.3
    let currentCamX = 0
    let currentCamY = 0.3
    const tempVec3 = new THREE.Vector3()

    const onPointerMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      mouse2D.x = (x / rect.width) * 2 - 1
      mouse2D.y = -(y / rect.height) * 2 + 1

      const normX = (e.clientX / window.innerWidth - 0.5) * 2
      const normY = (e.clientY / window.innerHeight - 0.5) * 2
      targetCamX = normX * 0.8
      targetCamY = -normY * 0.5 + 0.3
    }

    const onPointerLeave = () => {
      mouse2D.x = -999
      mouse2D.y = -999
      setHoveredTier(null)
      setHudPos(null)
    }

    el.addEventListener('mousemove', onPointerMove)
    el.addEventListener('mouseleave', onPointerLeave)

    const resizeObserver = new ResizeObserver(entries => {
      if (!entries[0]) return
      const { width, height } = entries[0].contentRect
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })
    resizeObserver.observe(el)

    let isVisible = true
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0.1 })
    visibilityObserver.observe(el)

    // ── Reveal Entrance Animation ────────────────────────────────
    coreGroup.scale.set(0.01, 0.01, 0.01)
    slabGroup.scale.set(0.01, 0.01, 0.01)
    tierCards.forEach(tc => tc.group.scale.set(0.01, 0.01, 0.01))

    const clock = new THREE.Clock()
    let revealTime = 0
    const REVEAL_DURATION = 1.8

    // ── Render Loop ──────────────────────────────────────────────
    const animate = () => {
      if (isDisposed) return
      animationFrameId = requestAnimationFrame(animate)
      if (!isVisible) return

      const delta = clock.getDelta()
      const t = clock.getElapsedTime()
      revealTime += delta

      // FPS Telemetry Counter
      frameCount++
      const now = performance.now()
      if (now - lastTime >= 1000) {
        setFpsText(`${Math.round((frameCount * 1000) / (now - lastTime))} FPS`)
        frameCount = 0
        lastTime = now
      }

      // Smooth Entrance
      if (revealTime < REVEAL_DURATION && !prefersReducedMotion) {
        const pCore = THREE.MathUtils.clamp(revealTime / 0.8, 0, 1)
        coreGroup.scale.setScalar(1 - Math.pow(1 - pCore, 3))

        const pSlab = THREE.MathUtils.clamp((revealTime - 0.25) / 0.8, 0, 1)
        slabGroup.scale.setScalar(1 - Math.pow(1 - pSlab, 3))

        tierCards.forEach((tc, i) => {
          const pCard = THREE.MathUtils.clamp((revealTime - 0.4 - i * 0.12) / 0.8, 0, 1)
          tc.group.scale.setScalar(1 - Math.pow(1 - pCard, 3))
        })
      } else {
        coreGroup.scale.setScalar(1)
        slabGroup.scale.setScalar(1)
      }

      // Studio Idle Dynamics
      // Central Calibration Engine Rotations
      coreMesh.rotation.y = t * 0.3
      coreMesh.rotation.x = Math.sin(t * 0.4) * 0.15
      innerCore.rotation.y = -t * 0.6
      innerCore.scale.setScalar(1 + Math.sin(t * 3.2) * 0.08)
      wireMesh.rotation.y = t * 0.15
      ringMesh.rotation.z = t * 0.5
      gimbalMesh.rotation.z = -t * 0.35

      // Compiler Slab Gentle Float
      slabGroup.position.y = 0.1 + Math.sin(t * 1.4) * 0.04
      slabGroup.rotation.z = Math.sin(t * 1.1) * 0.015

      // Target Cards Dynamic Track Highlighting & Raycasting
      const currentTrack = activeTrackRef.current

      tierCards.forEach((tc, idx) => {
        const isTrackMatch = currentTrack === 'all' || currentTrack === tc.data.id
        const isHovered = hoveredTier?.id === tc.data.id
        const isSelected = selectedTier?.id === tc.data.id

        // Idle floating levitation
        const floatY = Math.sin(t * 1.6 + idx * 1.2) * 0.035
        tc.group.position.y = tc.basePos.y + floatY

        if (!isTrackMatch) {
          tc.targetScale = 0.72
          tc.targetZ = tc.basePos.z - 0.4
          ;(tc.backplate.material as THREE.MeshStandardMaterial).opacity = 0.35
          ;(tc.backplate.material as THREE.MeshStandardMaterial).transparent = true
        } else if (isHovered || isSelected) {
          tc.targetScale = 1.15
          tc.targetZ = tc.basePos.z + 0.35
          ;(tc.backplate.material as THREE.MeshStandardMaterial).opacity = 1.0
          ;(tc.backplate.material as THREE.MeshStandardMaterial).transparent = false
        } else {
          tc.targetScale = 1.0
          tc.targetZ = tc.basePos.z
          ;(tc.backplate.material as THREE.MeshStandardMaterial).opacity = 1.0
          ;(tc.backplate.material as THREE.MeshStandardMaterial).transparent = false
        }

        tc.currentScale += (tc.targetScale - tc.currentScale) * 0.14
        tc.currentZ += (tc.targetZ - tc.currentZ) * 0.14
        tc.group.scale.setScalar(tc.currentScale)
        tc.group.position.z = tc.currentZ
      })

      // Flowing Pulse Particles along Bezier Paths
      pulseParticles.forEach(p => {
        p.progress += delta * p.speed
        if (p.progress > 1) p.progress = 0
        const curve = pipelineCurves[p.curveIndex]
        if (curve) {
          const pt = curve.getPoint(p.progress)
          p.mesh.position.copy(pt)
          p.mesh.scale.setScalar(0.7 + Math.sin(p.progress * Math.PI) * 0.6)
        }
      })

      // Micro-Dust Twinkle
      dustPoints.rotation.y = t * 0.012

      // Raycasting
      if (mouse2D.x !== -999 && mouse2D.y !== -999) {
        raycaster.setFromCamera(mouse2D, camera)
        const intersects = raycaster.intersectObjects(raycastTargets, false)
        if (intersects.length > 0) {
          const hit = intersects[0].object
          const data = hit.userData.data as CareerTierData
          setHoveredTier(data)

          hit.getWorldPosition(tempVec3)
          tempVec3.project(camera)
          const rect = el.getBoundingClientRect()
          const screenX = ((tempVec3.x + 1) / 2) * rect.width
          const screenY = ((-tempVec3.y + 1) / 2) * rect.height
          setHudPos({ x: screenX, y: screenY })
        } else {
          setHoveredTier(null)
          setHudPos(null)
        }
      }

      // Parallax Camera Smooth Lerp
      currentCamX += (targetCamX - currentCamX) * 0.06
      currentCamY += (targetCamY - currentCamY) * 0.06
      camera.position.x = currentCamX
      camera.position.y = currentCamY
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      el.removeEventListener('mousemove', onPointerMove)
      el.removeEventListener('mouseleave', onPointerLeave)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()

      coreGeo.dispose()
      coreMat.dispose()
      innerCoreGeo.dispose()
      innerCoreMat.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      gimbalGeo.dispose()
      gimbalMat.dispose()
      slabGeo.dispose()
      slabMat.dispose()
      headerGeo.dispose()
      headerMat.dispose()
      astBadgeGeo.dispose()
      astBadgeMat.dispose()
      testPillGeo.dispose()
      testPillMat.dispose()
      dustGeo.dispose()
      dustMat.dispose()

      tierCards.forEach(tc => {
        tc.backplate.geometry.dispose()
        ;(tc.backplate.material as THREE.Material).dispose()
        tc.indicator.geometry.dispose()
        ;(tc.indicator.material as THREE.Material).dispose()
      })

      renderer.dispose()
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
    }
  }, [])

  const activeDisplayTier = hoveredTier || selectedTier

  return (
    <div
      ref={mountRef}
      onClick={handleCanvasClick}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: hoveredTier ? 'pointer' : 'default',
      }}
    >
      {/* Contextual Career Inspector HUD Tooltip on Hover/Select */}
      {activeDisplayTier && hudPos && (
        <div
          className="studio-hud"
          style={{
            position: 'absolute',
            left: `${Math.min(hudPos.x + 12, (mountRef.current?.clientWidth || 600) - 240)}px`,
            top: `${hudPos.y - 50}px`,
            pointerEvents: 'none',
            zIndex: 40,
            transform: 'translateY(-50%)',
            transition: 'opacity 0.15s ease-out',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.96)',
              border: '2px solid #17191C',
              boxShadow: '0 12px 32px rgba(23, 25, 28, 0.16), 0 0 0 2px #F5FF38',
              borderRadius: '12px',
              padding: '12px 16px',
              minWidth: '220px',
              maxWidth: '260px',
              backdropFilter: 'blur(16px)',
              fontFamily: 'var(--font-body)',
              color: '#17191C',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.02rem', color: '#17191C' }}>
                {activeDisplayTier.title}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#17191C',
                  background: activeDisplayTier.accentColor,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 800,
                  border: '1px solid rgba(23, 25, 28, 0.2)',
                }}
              >
                {activeDisplayTier.salary}
              </span>
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#555A62', marginBottom: '6px' }}>
              {activeDisplayTier.companyGroup}
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#17191C',
                background: '#F7F8FA',
                padding: '4px 8px',
                borderRadius: '6px',
                marginBottom: '6px',
                border: '1px solid rgba(23, 25, 28, 0.08)',
              }}
            >
              <div>{activeDisplayTier.complexity}</div>
              <div style={{ color: '#27C93F', fontWeight: 800, marginTop: '2px' }}>
                {activeDisplayTier.testsPassed}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(23, 25, 28, 0.08)', paddingTop: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#17191C', fontWeight: 800 }}>
                {activeDisplayTier.questionCount}+ Tagged Qs
              </span>
              <span style={{ fontSize: '0.65rem', color: '#858B94', fontWeight: 600 }}>Click to isolate</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating 3D Telemetry Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.92)',
          border: '1px solid rgba(23, 25, 28, 0.12)',
          borderRadius: '9999px',
          padding: '4px 12px',
          backdropFilter: 'blur(8px)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          fontWeight: 700,
          color: '#17191C',
          boxShadow: '0 2px 8px rgba(23, 25, 28, 0.06)',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#F5FF38',
            border: '1.5px solid #17191C',
            display: 'inline-block',
          }}
        />
        <span>CAREER STUDIO · {fpsText}</span>
      </div>
    </div>
  )
}
