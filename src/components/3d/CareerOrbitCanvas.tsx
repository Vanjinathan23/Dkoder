import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

export interface OrbitNodeData {
  id: string
  label: string
  role: string
  color: string
  radius: number
  speed: number
  size: number
  theta: number
  inclination: number
  tilt: number
  questions: number
  focus: string
  tier: 'tier1' | 'tier2' | 'tier3'
}

const NODES_DATA: OrbitNodeData[] = [
  { id: 'google',    label: 'Google',    role: 'SDE-II / Staff',     color: '#E4EE1B', radius: 2.7, speed: 0.24, size: 0.18, theta: 0.2,            inclination: 0.25, tilt: 0.15, questions: 380, focus: 'Graphs, DP & Distributed Systems', tier: 'tier1' },
  { id: 'microsoft', label: 'Microsoft', role: 'SWE / Cloud Eng',    color: '#8875FF', radius: 2.1, speed: 0.38, size: 0.15, theta: Math.PI * 0.45,  inclination: -0.3, tilt: -0.2, questions: 320, focus: 'Trees, System Design, Azure',      tier: 'tier1' },
  { id: 'amazon',    label: 'Amazon',    role: 'SDE-I / SDE-II',     color: '#FF7A29', radius: 3.4, speed: 0.19, size: 0.18, theta: Math.PI * 0.85,  inclination: 0.4,  tilt: 0.3,  questions: 420, focus: 'Leadership Principles, OOP & DSA', tier: 'tier1' },
  { id: 'meta',      label: 'Meta',      role: 'E4 / Frontend SDE',  color: '#E4EE1B', radius: 1.6, speed: 0.52, size: 0.14, theta: Math.PI * 1.25,  inclination: -0.15,tilt: 0.1,  questions: 290, focus: 'Binary Search, Graphs & UI Perf', tier: 'tier1' },
  { id: 'nvidia',    label: 'NVIDIA',    role: 'AI / CUDA Engineer', color: '#68B000', radius: 3.9, speed: 0.14, size: 0.16, theta: Math.PI * 1.65,  inclination: 0.35, tilt: -0.25,questions: 175, focus: 'Parallel Computing, C++ & Math',  tier: 'tier1' },
  { id: 'tcs',       label: 'TCS',       role: 'Digital / Prime',    color: '#FF7A29', radius: 2.4, speed: 0.31, size: 0.14, theta: Math.PI * 0.15,  inclination: -0.4, tilt: 0.2,  questions: 510, focus: 'Quantitative Aptitude, CodeVita',  tier: 'tier2' },
  { id: 'infosys',   label: 'Infosys',   role: 'Specialist Prog',    color: '#8875FF', radius: 3.1, speed: 0.22, size: 0.15, theta: Math.PI * 1.05,  inclination: 0.2,  tilt: -0.35,questions: 480, focus: 'InfyTQ, Dynamic Programming',      tier: 'tier2' },
  { id: 'flipkart',  label: 'Flipkart',  role: 'SDE-1 / Machine Ops',color: '#8875FF', radius: 1.9, speed: 0.44, size: 0.13, theta: Math.PI * 1.45,  inclination: -0.25,tilt: 0.18, questions: 260, focus: 'System Architecture & High Volume',tier: 'tier1' },
]

interface Props {
  activeTrackId?: string
}

export default function CareerOrbitCanvas({ activeTrackId = 'sde' }: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<OrbitNodeData | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const [selectedNode, setSelectedNode] = useState<OrbitNodeData | null>(null)

  const handleCanvasClick = useCallback(() => {
    if (hoveredNode) {
      setSelectedNode(prev => (prev?.id === hoveredNode.id ? null : hoveredNode))
    }
  }, [hoveredNode])

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let isDisposed = false
    let animationFrameId = 0

    const isMobile = window.innerWidth < 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const W = el.clientWidth || 600
    const H = el.clientHeight || 520

    // ── Bright Studio WebGL Renderer ─────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    // ── Scene & Camera ──────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.set(0, 2.2, 8.4)
    camera.lookAt(0, 0, 0)

    const orbitSystemGroup = new THREE.Group()
    scene.add(orbitSystemGroup)

    // ── Bright High-Key Lighting Setup ──────────────────────────
    // Ambient light with warm studio fill
    const ambientLight = new THREE.AmbientLight(0xfffdf5, 2.2)
    scene.add(ambientLight)

    // Key directional sun/studio light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8)
    keyLight.position.set(6, 10, 8)
    keyLight.castShadow = true
    scene.add(keyLight)

    // Fill light from bottom left
    const fillLight = new THREE.DirectionalLight(0xf5ff38, 1.2)
    fillLight.position.set(-5, -3, 4)
    scene.add(fillLight)

    // Electric yellow point light
    const pYellow = new THREE.PointLight(0xf5ff38, 4.5, 14, 1.1)
    pYellow.position.set(2.5, 2.0, 2.5)
    scene.add(pYellow)

    // Electric violet accent light
    const pViolet = new THREE.PointLight(0x8875ff, 3.5, 12, 1.2)
    pViolet.position.set(-3.2, -1.8, 1.8)
    scene.add(pViolet)

    // ── Sculptural Central Core (Glossy Ceramic & Yellow Nucleus) ──
    const coreGroup = new THREE.Group()
    orbitSystemGroup.add(coreGroup)

    // Inner glowing nucleus (octahedron)
    const nucleusGeo = new THREE.OctahedronGeometry(0.34, 0)
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0xf5ff38,
      emissive: 0xf5ff38,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.2,
    })
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat)
    coreGroup.add(nucleus)

    // Inner wireframe lattice in violet
    const innerWireGeo = new THREE.IcosahedronGeometry(0.56, 1)
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x8875ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    })
    const innerWire = new THREE.Mesh(innerWireGeo, innerWireMat)
    coreGroup.add(innerWire)

    // Outer sculptural glossy ceramic faceted shell
    const coreShieldGeo = new THREE.IcosahedronGeometry(0.5, 2)
    const coreShieldMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.2,
      thickness: 0.4,
    })
    const coreShield = new THREE.Mesh(coreShieldGeo, coreShieldMat)
    coreShield.castShadow = true
    coreGroup.add(coreShield)

    // Core equator ring in signature yellow
    const equatorGeo = new THREE.TorusGeometry(0.68, 0.02, 16, 64)
    const equatorMat = new THREE.MeshStandardMaterial({
      color: 0xf5ff38,
      emissive: 0xf5ff38,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.3,
    })
    const equator = new THREE.Mesh(equatorGeo, equatorMat)
    equator.rotation.x = Math.PI / 2
    coreGroup.add(equator)

    // ── Asymmetrical Orbital Rings (Vibrant Yellow & Violet) ─────
    const ringConfigs = [
      { r: 1.6, tube: 0.012, rotX: 0.45, rotZ: 0.2,  color: 0xf5ff38, opacity: 0.95 },
      { r: 2.1, tube: 0.014, rotX: -0.35, rotZ: -0.4, color: 0x8875ff, opacity: 0.85 },
      { r: 2.7, tube: 0.012, rotX: 0.6,  rotZ: -0.15, color: 0xf5ff38, opacity: 0.9 },
      { r: 3.4, tube: 0.015, rotX: -0.5, rotZ: 0.35, color: 0x8875ff, opacity: 0.75 },
      { r: 3.9, tube: 0.010, rotX: 0.25, rotZ: -0.55, color: 0xff7a29, opacity: 0.7 },
    ]

    const ringMeshes: THREE.Mesh[] = []
    ringConfigs.forEach(cfg => {
      const geo = new THREE.TorusGeometry(cfg.r, cfg.tube, 12, 128)
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: 0.2,
        metalness: 0.4,
        emissive: cfg.color,
        emissiveIntensity: 0.35,
      })
      const ring = new THREE.Mesh(geo, mat)
      ring.rotation.x = Math.PI / 2 + cfg.rotX
      ring.rotation.z = cfg.rotZ
      orbitSystemGroup.add(ring)
      ringMeshes.push(ring)
    })

    // ── Orbit Nodes & Interaction Meshes ────────────────────────
    interface NodeMeshItem {
      data: OrbitNodeData
      group: THREE.Group
      sphere: THREE.Mesh
      corona: THREE.Mesh
      initialScale: number
      targetScale: number
    }

    const nodeMeshItems: NodeMeshItem[] = []
    const raycastTargets: THREE.Object3D[] = []

    NODES_DATA.forEach(nodeData => {
      const nodeGroup = new THREE.Group()
      orbitSystemGroup.add(nodeGroup)

      // Solid vibrant sphere with ceramic gloss
      const sphereGeo = new THREE.SphereGeometry(nodeData.size, 20, 20)
      const sphereMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(nodeData.color),
        roughness: 0.15,
        metalness: 0.3,
        emissive: new THREE.Color(nodeData.color),
        emissiveIntensity: 0.5,
      })
      const sphere = new THREE.Mesh(sphereGeo, sphereMat)
      sphere.userData = { nodeId: nodeData.id, data: nodeData }
      nodeGroup.add(sphere)
      raycastTargets.push(sphere)

      // Outer delicate halo ring
      const coronaGeo = new THREE.TorusGeometry(nodeData.size * 1.6, 0.008, 8, 32)
      const coronaMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(nodeData.color),
        transparent: true,
        opacity: 0.7,
      })
      const corona = new THREE.Mesh(coronaGeo, coronaMat)
      corona.rotation.x = Math.PI / 2
      nodeGroup.add(corona)

      nodeMeshItems.push({
        data: nodeData,
        group: nodeGroup,
        sphere,
        corona,
        initialScale: 1,
        targetScale: 1,
      })
    })

    // ── Inter-Node Connecting Lines (Crisp High-Contrast) ───────
    const linePairs: [number, number][] = [
      [0, 1], [0, 3], [1, 7], [2, 0], [2, 4], [3, 6], [5, 6], [6, 7],
    ]
    const linePositions = new Float32Array(linePairs.length * 6)
    const lineColors = new Float32Array(linePairs.length * 6)

    linePairs.forEach((pair, idx) => {
      const c1 = new THREE.Color(NODES_DATA[pair[0]].color)
      const c2 = new THREE.Color(NODES_DATA[pair[1]].color)
      lineColors[idx * 6]     = c1.r; lineColors[idx * 6 + 1] = c1.g; lineColors[idx * 6 + 2] = c1.b
      lineColors[idx * 6 + 3] = c2.r; lineColors[idx * 6 + 4] = c2.g; lineColors[idx * 6 + 5] = c2.b
    })

    const linesGeo = new THREE.BufferGeometry()
    linesGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    linesGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    })
    const connectionLines = new THREE.LineSegments(linesGeo, linesMat)
    orbitSystemGroup.add(connectionLines)

    // ── Floating Sunlit Micro-Dust Particles ─────────────────────
    const particleCount = isMobile ? 250 : 800
    const pPositions = new Float32Array(particleCount * 3)
    const pColors = new Float32Array(particleCount * 3)
    const colYellow = new THREE.Color(0xf5ff38)
    const colViolet = new THREE.Color(0x8875ff)
    const colGraphite = new THREE.Color(0x767d88)

    for (let i = 0; i < particleCount; i++) {
      const rad = 2.0 + Math.random() * 14
      const phi = Math.random() * Math.PI * 2
      const theta = Math.acos(2 * Math.random() - 1)
      pPositions[i * 3]     = rad * Math.sin(theta) * Math.cos(phi)
      pPositions[i * 3 + 1] = rad * Math.sin(theta) * Math.sin(phi) * 0.7
      pPositions[i * 3 + 2] = rad * Math.cos(theta)

      const choice = Math.random()
      const c = choice < 0.4 ? colYellow : choice < 0.7 ? colViolet : colGraphite
      pColors[i * 3]     = c.r
      pColors[i * 3 + 1] = c.g
      pColors[i * 3 + 2] = c.b
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))
    const pMat = new THREE.PointsMaterial({
      size: isMobile ? 0.04 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    })
    const particleField = new THREE.Points(pGeo, pMat)
    scene.add(particleField)

    // ── Raycasting & Mouse Parallax ──────────────────────────────
    const raycaster = new THREE.Raycaster()
    const mousePos2D = new THREE.Vector2(-999, -999)
    let targetCameraX = 0
    let targetCameraY = 2.2
    let currentCameraX = 0
    let currentCameraY = 2.2

    const onPointerMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      mousePos2D.x = (x / rect.width) * 2 - 1
      mousePos2D.y = -(y / rect.height) * 2 + 1

      const normX = (e.clientX / window.innerWidth - 0.5) * 2
      const normY = (e.clientY / window.innerHeight - 0.5) * 2
      targetCameraX = normX * 1.3
      targetCameraY = -normY * 0.7 + 2.2
    }

    const onPointerLeave = () => {
      mousePos2D.x = -999
      mousePos2D.y = -999
      setHoveredNode(null)
      setTooltipPos(null)
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

    // ── Reveal Animation ─────────────────────────────────────────
    coreGroup.scale.set(0.01, 0.01, 0.01)
    ringMeshes.forEach(r => r.scale.set(0.01, 0.01, 0.01))
    nodeMeshItems.forEach(n => n.group.scale.set(0.01, 0.01, 0.01))
    connectionLines.scale.set(0.01, 0.01, 0.01)

    const clock = new THREE.Clock()
    let revealTime = 0
    const REVEAL_DURATION = 2.2

    const tempVec3 = new THREE.Vector3()

    const animate = () => {
      if (isDisposed) return
      animationFrameId = requestAnimationFrame(animate)
      if (!isVisible) return

      const delta = clock.getDelta()
      const t = clock.getElapsedTime()
      revealTime += delta

      if (revealTime < REVEAL_DURATION && !prefersReducedMotion) {
        const coreProg = THREE.MathUtils.clamp(revealTime / 0.7, 0, 1)
        coreGroup.scale.setScalar(1 - Math.pow(1 - coreProg, 3))

        ringMeshes.forEach((r, idx) => {
          const stagger = THREE.MathUtils.clamp((revealTime - 0.3 - idx * 0.1) / 0.8, 0, 1)
          r.scale.setScalar(1 - Math.pow(1 - stagger, 3))
        })

        nodeMeshItems.forEach((n, idx) => {
          const nodeProg = THREE.MathUtils.clamp((revealTime - 0.6 - idx * 0.1) / 0.7, 0, 1)
          n.group.scale.setScalar(Math.sin((nodeProg * Math.PI) / 2))
        })

        const lineProg = THREE.MathUtils.clamp((revealTime - 1.2) / 0.8, 0, 1)
        connectionLines.scale.setScalar(lineProg)
      } else {
        coreGroup.scale.setScalar(1)
        ringMeshes.forEach(r => r.scale.setScalar(1))
        nodeMeshItems.forEach(n => n.group.scale.setScalar(1))
        connectionLines.scale.setScalar(1)
      }

      // Rotations
      coreGroup.rotation.y = t * 0.35
      coreGroup.rotation.x = t * 0.15
      innerWire.rotation.y = -t * 0.5
      equator.rotation.z = t * 0.8
      nucleus.scale.setScalar(1 + Math.sin(t * 3.5) * 0.06)

      ringMeshes.forEach((r, i) => {
        r.rotation.z += (i % 2 === 0 ? 0.003 : -0.0025)
        r.rotation.x += Math.sin(t * 0.5 + i) * 0.001
      })

      // Orbit Nodes
      const currentPositions: THREE.Vector3[] = []
      nodeMeshItems.forEach((item, index) => {
        const { data, group, sphere, corona } = item
        const angle = data.theta + t * data.speed

        const x = Math.cos(angle) * data.radius
        const z = Math.sin(angle) * data.radius * 0.65
        const y = Math.sin(angle * 1.5 + data.tilt) * (data.inclination * 1.8)

        group.position.set(x, y, z)
        currentPositions.push(new THREE.Vector3(x, y, z))

        sphere.rotation.y += 0.02
        corona.rotation.z += 0.03
        const pulse = 1 + Math.sin(t * 2.8 + index) * 0.05

        item.targetScale = (hoveredNode?.id === data.id || selectedNode?.id === data.id) ? 1.5 : 1.0
        item.initialScale += (item.targetScale - item.initialScale) * 0.15
        group.scale.setScalar(item.initialScale * pulse)

        const mat = sphere.material as THREE.MeshStandardMaterial
        if (hoveredNode?.id === data.id || selectedNode?.id === data.id) {
          mat.emissiveIntensity = 1.4
          corona.scale.setScalar(1.25)
        } else {
          mat.emissiveIntensity = 0.5
          corona.scale.setScalar(1.0)
        }
      })

      // Connecting lines update
      const posAttr = linesGeo.attributes.position as THREE.BufferAttribute
      const posArray = posAttr.array as Float32Array
      linePairs.forEach((pair, idx) => {
        const p1 = currentPositions[pair[0]]
        const p2 = currentPositions[pair[1]]
        if (p1 && p2) {
          posArray[idx * 6]     = p1.x
          posArray[idx * 6 + 1] = p1.y
          posArray[idx * 6 + 2] = p1.z
          posArray[idx * 6 + 3] = p2.x
          posArray[idx * 6 + 4] = p2.y
          posArray[idx * 6 + 5] = p2.z
        }
      })
      posAttr.needsUpdate = true

      // Floating micro dust rotation
      particleField.rotation.y = t * 0.015
      particleField.rotation.x = Math.sin(t * 0.01) * 0.03

      // Raycaster
      if (mousePos2D.x !== -999 && mousePos2D.y !== -999) {
        raycaster.setFromCamera(mousePos2D, camera)
        const intersects = raycaster.intersectObjects(raycastTargets, false)
        if (intersects.length > 0) {
          const hit = intersects[0].object
          const data = hit.userData.data as OrbitNodeData
          setHoveredNode(data)

          hit.getWorldPosition(tempVec3)
          tempVec3.project(camera)
          const rect = el.getBoundingClientRect()
          const screenX = ((tempVec3.x + 1) / 2) * rect.width
          const screenY = ((-tempVec3.y + 1) / 2) * rect.height
          setTooltipPos({ x: screenX, y: screenY })
        } else {
          setHoveredNode(null)
          setTooltipPos(null)
        }
      }

      // Parallax camera lerp
      currentCameraX += (targetCameraX - currentCameraX) * 0.05
      currentCameraY += (targetCameraY - currentCameraY) * 0.05
      camera.position.x = currentCameraX
      camera.position.y = currentCameraY
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

      nucleusGeo.dispose()
      nucleusMat.dispose()
      innerWireGeo.dispose()
      innerWireMat.dispose()
      coreShieldGeo.dispose()
      coreShieldMat.dispose()
      equatorGeo.dispose()
      equatorMat.dispose()
      linesGeo.dispose()
      linesMat.dispose()
      pGeo.dispose()
      pMat.dispose()

      ringMeshes.forEach(r => {
        r.geometry.dispose()
        ;(r.material as THREE.Material).dispose()
      })

      nodeMeshItems.forEach(item => {
        item.sphere.geometry.dispose()
        ;(item.sphere.material as THREE.Material).dispose()
        item.corona.geometry.dispose()
        ;(item.corona.material as THREE.Material).dispose()
      })

      renderer.dispose()
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
    }
  }, [])

  const activeDisplayNode = hoveredNode || selectedNode

  return (
    <div
      ref={mountRef}
      onClick={handleCanvasClick}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: hoveredNode ? 'pointer' : 'default',
      }}
    >
      {/* Bright Studio Raycast Floating HUD Tooltip */}
      {activeDisplayNode && tooltipPos && (
        <div
          className="orbit-hud"
          style={{
            position: 'absolute',
            left: `${tooltipPos.x + 16}px`,
            top: `${tooltipPos.y - 40}px`,
            pointerEvents: 'none',
            zIndex: 30,
            transform: 'translateY(-50%)',
            transition: 'opacity 0.15s ease-out',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.96)',
              border: '2px solid #17191C',
              boxShadow: '0 12px 32px rgba(23, 25, 28, 0.14), 0 0 0 2px #F5FF38',
              borderRadius: '12px',
              padding: '12px 16px',
              minWidth: '200px',
              backdropFilter: 'blur(12px)',
              fontFamily: 'var(--font-body)',
              color: '#17191C',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: '#17191C' }}>
                {activeDisplayNode.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#17191C',
                  background: '#F5FF38',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  border: '1px solid rgba(23, 25, 28, 0.2)',
                }}
              >
                {activeDisplayNode.role}
              </span>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#555A62', marginBottom: '8px', lineHeight: 1.3 }}>
              {activeDisplayNode.focus}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(23, 25, 28, 0.08)', paddingTop: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#17191C', fontWeight: 800 }}>
                {activeDisplayNode.questions}+ Tagged Qs
              </span>
              <span style={{ fontSize: '0.68rem', color: '#858B94', fontWeight: 600 }}>Click to lock</span>
            </div>
          </div>
        </div>
      )}

      {/* Bright Studio Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.88)',
          border: '1px solid rgba(23, 25, 28, 0.1)',
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
        <span>3D ENGINE ACTIVE · 60 FPS</span>
      </div>
    </div>
  )
}
