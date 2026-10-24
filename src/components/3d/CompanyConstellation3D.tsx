import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export interface ConstellationCompany {
  id: string
  name: string
  tier: 'super-dream' | 'cloud' | 'service'
  packageLPA: number
  packageRange: string
  questionsCount: number
  primaryTopic: string
  examTrack: string
  hiringType: 'Product MNC' | 'Enterprise Cloud' | 'Service MNC'
  recentDriveDate: string
  coords: [number, number, number] // [x, 0, z] in the 3D world
  color: string
  landmarkHQ: string        // Real-world headquarters name & location
  architectureStory: string // Architectural signature & real-world building details
  buildingStyle:
    | 'meta-gherkin'
    | 'google-stepped'
    | 'microsoft-redmond'
    | 'nvidia-monolith'
    | 'amazon-spheres'
    | 'flipkart-tower'
    | 'servicenow-cylinder'
    | 'oracle-redwood'
    | 'tcs-tower'
    | 'infosys-tower'
    | 'cognizant-techno'
    | 'wipro-rotunda'
}

export const CONSTELLATION_COMPANIES: ConstellationCompany[] = [
  // Super-Dream Tier (Real-world Flagship Silicon Landmarks, 20–50+ LPA)
  {
    id: 'meta',
    name: 'Meta',
    tier: 'super-dream',
    packageLPA: 50,
    packageRange: '₹28 — ₹50 LPA',
    questionsCount: 290,
    primaryTopic: 'Binary Search, Graph Traversal & UI Systems',
    examTrack: 'Meta Engineering Screen',
    hiringType: 'Product MNC',
    recentDriveDate: 'Fresh 2026 Drive',
    coords: [1.2, 0, 1.4],
    color: '#8B5CF6',
    landmarkHQ: 'Meta Silicon Flagship Spire — Menlo Park & London',
    architectureStory: 'Iconic aerodynamic diagrid lattice skyscraper crowned with a rounded glass observation dome, symbolizing frontier AI & immersive worlds.',
    buildingStyle: 'meta-gherkin',
  },
  {
    id: 'google',
    name: 'Google',
    tier: 'super-dream',
    packageLPA: 45,
    packageRange: '₹25 — ₹45 LPA',
    questionsCount: 380,
    primaryTopic: 'Graphs, 2D DP & Distributed Systems',
    examTrack: 'Google Online Assessment (OA)',
    hiringType: 'Product MNC',
    recentDriveDate: 'Fresh 2026 Drive',
    coords: [-1.8, 0, 1.4],
    color: '#FACC15',
    landmarkHQ: 'Google Mountain View High-Rise — Mountain View, CA',
    architectureStory: 'Soaring multi-tiered stepped glass corporate tower featuring cantilevered sky-gardens, warm illuminated atrium & 4-color rooftop crown.',
    buildingStyle: 'google-stepped',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    tier: 'super-dream',
    packageLPA: 42,
    packageRange: '₹18 — ₹42 LPA',
    questionsCount: 320,
    primaryTopic: 'Binary Trees, Azure Architectures & System Design',
    examTrack: 'Codility Campus Challenge',
    hiringType: 'Product MNC',
    recentDriveDate: 'Fresh 2026 Drive',
    coords: [-0.6, 0, -0.6],
    color: '#0284C7',
    landmarkHQ: 'Redmond Innovation Tower & Skybridge — Redmond, WA',
    architectureStory: 'Twin angular crystalline azure skyscrapers linked across the courtyard by an illuminated glass skybridge, crowned with Microsoft’s 4-color beacon.',
    buildingStyle: 'microsoft-redmond',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    tier: 'super-dream',
    packageLPA: 42,
    packageRange: '₹24 — ₹42 LPA',
    questionsCount: 175,
    primaryTopic: 'CUDA, Parallel Algorithms & C++ Systems',
    examTrack: 'NVIDIA Systems Challenge',
    hiringType: 'Product MNC',
    recentDriveDate: 'Fresh 2026 Drive',
    coords: [-2.4, 0, -1.8],
    color: '#22C55E',
    landmarkHQ: 'Endeavor & Voyager Geometric Tower — Santa Clara, CA',
    architectureStory: 'Striking faceted triangular obsidian monolith skyscraper with glowing emerald green polygon edge beams and triangular graphics skylights.',
    buildingStyle: 'nvidia-monolith',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    tier: 'super-dream',
    packageLPA: 38,
    packageRange: '₹16 — ₹38 LPA',
    questionsCount: 420,
    primaryTopic: 'Leadership Principles, OOP & Arrays',
    examTrack: 'Amazon SDE-1 Assessment',
    hiringType: 'Product MNC',
    recentDriveDate: 'Fresh 2026 Drive',
    coords: [2.8, 0, -0.4],
    color: '#F97316',
    landmarkHQ: 'The Spheres & Doppler Tower — Seattle, WA',
    architectureStory: 'Tall sleek Doppler glass skyscraper flanked by 3 illuminated botanical geodesic glass spheres housing 40,000 tropical cloud forest plants.',
    buildingStyle: 'amazon-spheres',
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    tier: 'super-dream',
    packageLPA: 32,
    packageRange: '₹18 — ₹32 LPA',
    questionsCount: 260,
    primaryTopic: 'Machine Coding, Concurrency & High Volume',
    examTrack: 'GRiD Machine Coding Round',
    hiringType: 'Product MNC',
    recentDriveDate: 'Fresh 2026 Drive',
    coords: [0.6, 0, 3.2],
    color: '#6366F1',
    landmarkHQ: 'Flipkart Cessna High-Rise — Bengaluru, KA',
    architectureStory: 'Stepped modern glass corporate skyscraper featuring cantilevered yellow architectural frames, high-speed elevators & rooftop certified helipad.',
    buildingStyle: 'flipkart-tower',
  },

  // Enterprise Cloud Tier (Waterfront Avenue, 10–20+ LPA)
  {
    id: 'servicenow',
    name: 'ServiceNow',
    tier: 'cloud',
    packageLPA: 30,
    packageRange: '₹16 — ₹30 LPA',
    questionsCount: 215,
    primaryTopic: 'Cloud Microservices, Complex SQL & DBMS',
    examTrack: 'ServiceNow Cloud Diagnostic',
    hiringType: 'Enterprise Cloud',
    recentDriveDate: 'Fresh 2026 Drive',
    coords: [2.2, 0, 2.6],
    color: '#06B6D4',
    landmarkHQ: 'Silicon Valley Cloud Tower — Santa Clara, CA',
    architectureStory: 'Curved aerodynamic cylindrical glass skyscraper with horizontal floor bands, cascading sky-terraces & glowing cyan crown.',
    buildingStyle: 'servicenow-cylinder',
  },
  {
    id: 'oracle',
    name: 'Oracle',
    tier: 'cloud',
    packageLPA: 28,
    packageRange: '₹14 — ₹28 LPA',
    questionsCount: 230,
    primaryTopic: 'OCI Architecture, Heaps & Operating Systems',
    examTrack: 'Oracle Cloud Assessment',
    hiringType: 'Enterprise Cloud',
    recentDriveDate: 'Fresh 2026 Drive',
    coords: [-1.4, 0, 3.0],
    color: '#EF4444',
    landmarkHQ: 'Redwood Shores "Emerald City" — Redwood City, CA',
    architectureStory: 'World-famous mirrored cylindrical bronze-green glass towers rising dramatically alongside the Oracle reflection lagoon.',
    buildingStyle: 'oracle-redwood',
  },

  // Service MNC Tier (Innovation Corridor, 3–11 LPA)
  {
    id: 'tcs',
    name: 'TCS',
    tier: 'service',
    packageLPA: 11.5,
    packageRange: '₹7.0 — ₹11.5 LPA',
    questionsCount: 510,
    primaryTopic: 'TCS NQT Advanced Coding, CodeVita DSA & Aptitude',
    examTrack: 'TCS National Qualifier Test (NQT)',
    hiringType: 'Service MNC',
    recentDriveDate: 'Verified 2025/26 Cycle',
    coords: [-4.2, 0, -0.6],
    color: '#3B82F6',
    landmarkHQ: 'TCS Siruseri High-Rise & Butterfly Wings — Chennai, TN',
    architectureStory: 'Tall classic stone-and-glass corporate tower with aerodynamic curved facade wings and central spine canal.',
    buildingStyle: 'tcs-tower',
  },
  {
    id: 'infosys',
    name: 'Infosys',
    tier: 'service',
    packageLPA: 9.5,
    packageRange: '₹9.5 LPA (SP Track)',
    questionsCount: 480,
    primaryTopic: 'InfyTQ Advanced, HackWithInfy & Dynamic Prog',
    examTrack: 'HackWithInfy / InfyTQ',
    hiringType: 'Service MNC',
    recentDriveDate: 'Verified 2025/26 Cycle',
    coords: [-3.8, 0, 3.2],
    color: '#2563EB',
    landmarkHQ: 'Infosys Hinjawadi Tech Tower & Spaceship — Pune, MH',
    architectureStory: 'Stepped modern IT glass skyscraper with the famous futuristic tilted glass ellipsoid spaceship dome at the entrance plaza.',
    buildingStyle: 'infosys-tower',
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    tier: 'service',
    packageLPA: 9.2,
    packageRange: '₹6.5 — ₹9.2 LPA',
    questionsCount: 360,
    primaryTopic: 'GenC Next Advanced Track, Strings & Matrices',
    examTrack: 'GenC Next Skill Diagnostic',
    hiringType: 'Service MNC',
    recentDriveDate: 'Verified 2025/26 Cycle',
    coords: [1.6, 0, -2.4],
    color: '#1D4ED8',
    landmarkHQ: 'Sholinganallur Techno-Tower — Chennai, TN',
    architectureStory: 'Multi-tiered concentric cylindrical glass skyscraper with spiral cascading green terraces & blue solar glazing.',
    buildingStyle: 'cognizant-techno',
  },
  {
    id: 'wipro',
    name: 'Wipro',
    tier: 'service',
    packageLPA: 9.0,
    packageRange: '₹6.5 — ₹9.0 LPA',
    questionsCount: 340,
    primaryTopic: 'Wipro NLTH Diagnostic, Coding & Automata',
    examTrack: 'Wipro Elite / Turbo Test',
    hiringType: 'Service MNC',
    recentDriveDate: 'Verified 2025/26 Cycle',
    coords: [-1.2, 0, -2.8],
    color: '#FB923C',
    landmarkHQ: 'Sarjapur Rotunda Innovation Tower — Bengaluru, KA',
    architectureStory: 'High-rise corporate tower featuring the central circular clock rotunda, modern glass IT wings & rooftop solar arrays.',
    buildingStyle: 'wipro-rotunda',
  },
]

type PerspectiveMode = 'iso' | 'waterfront' | 'skyline'

interface Props {
  selectedTier: 'all' | 'super-dream' | 'cloud' | 'service'
  activeCompanyId: string
  onSelectCompany: (company: ConstellationCompany) => void
}

export default function CompanyConstellation3D({
  selectedTier,
  activeCompanyId,
  onSelectCompany,
}: Props) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [hoveredCompany, setHoveredCompany] = useState<ConstellationCompany | null>(null)
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)
  const [perspective, setPerspective] = useState<PerspectiveMode>('iso')

  // Keep latest props in refs to avoid re-triggering useEffect
  const activeCompanyRef = useRef(activeCompanyId)
  activeCompanyRef.current = activeCompanyId

  const selectedTierRef = useRef(selectedTier)
  selectedTierRef.current = selectedTier

  const perspectiveRef = useRef(perspective)
  perspectiveRef.current = perspective

  const onSelectCompanyRef = useRef(onSelectCompany)
  onSelectCompanyRef.current = onSelectCompany

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let width = el.clientWidth || 600
    let height = el.clientHeight || 480

    // 1. Scene & Camera Setup (Oblique Aerial Isometric View like Cesium/GIS City Model)
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xD9E2EC)
    scene.fog = new THREE.Fog(0xD9E2EC, 16, 48)

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100)

    const getCamTarget = (mode: PerspectiveMode) => {
      if (mode === 'waterfront') {
        return { pos: new THREE.Vector3(4.8, 2.6, 5.8), look: new THREE.Vector3(-0.5, 0.8, 0) }
      }
      if (mode === 'skyline') {
        return { pos: new THREE.Vector3(-0.2, 1.8, 7.5), look: new THREE.Vector3(0, 1.2, 0) }
      }
      // 'iso' - Default Aerial Oblique View
      return { pos: new THREE.Vector3(3.5, 6.2, 7.4), look: new THREE.Vector3(-0.3, 0.6, 0.2) }
    }

    const initialCam = getCamTarget('iso')
    camera.position.copy(initialCam.pos)
    const currentLookAt = new THREE.Vector3().copy(initialCam.look)
    camera.lookAt(currentLookAt)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    // 2. Realistic Sunlight & Soft Architectural Skylight
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const sunLight = new THREE.DirectionalLight(0xfffaee, 2.3)
    sunLight.position.set(9, 16, 8)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 1024
    sunLight.shadow.mapSize.height = 1024
    sunLight.shadow.camera.near = 1
    sunLight.shadow.camera.far = 40
    sunLight.shadow.camera.left = -9
    sunLight.shadow.camera.right = 9
    sunLight.shadow.camera.top = 9
    sunLight.shadow.camera.bottom = -9
    sunLight.shadow.bias = -0.0006
    scene.add(sunLight)

    const fillHemi = new THREE.HemisphereLight(0xffffff, 0x94a3b8, 0.75)
    scene.add(fillHemi)

    // 3. Procedural Architectural Facade Textures
    const createCurtainWallTex = (glassColor: string, mullionColor: string) => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = mullionColor
        ctx.fillRect(0, 0, 256, 256)

        const rows = 16
        const cols = 8
        const paneW = 256 / cols
        const paneH = 256 / rows

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            ctx.fillStyle = glassColor
            ctx.fillRect(c * paneW + 2, r * paneH + 2, paneW - 4, paneH - 4)

            if ((r + c * 3) % 5 === 0) {
              ctx.fillStyle = 'rgba(255, 245, 200, 0.35)'
              ctx.fillRect(c * paneW + 3, r * paneH + 3, paneW - 6, paneH - 6)
            }
          }
          ctx.fillStyle = '#334155'
          ctx.fillRect(0, r * paneH + paneH - 3, 256, 3)
        }
      }
      const tex = new THREE.CanvasTexture(canvas)
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      return tex
    }

    const createStoneFacadeTex = (stoneColor: string, windowColor: string) => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = stoneColor
        ctx.fillRect(0, 0, 256, 256)

        const rows = 12
        const cols = 6
        const paneW = 256 / cols
        const paneH = 256 / rows

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            ctx.fillStyle = '#CBD5E1'
            ctx.fillRect(c * paneW + 8, r * paneH + paneH - 5, paneW - 16, 4)

            ctx.fillStyle = windowColor
            ctx.fillRect(c * paneW + 10, r * paneH + 6, paneW - 20, paneH - 12)

            ctx.strokeStyle = '#FFFFFF'
            ctx.lineWidth = 1
            ctx.strokeRect(c * paneW + 10, r * paneH + 6, paneW - 20, paneH - 12)
          }
        }
      }
      const tex = new THREE.CanvasTexture(canvas)
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      return tex
    }

    // London Gherkin / Meta Aerodynamic Diagrid Lattice Texture
    const createDiagridTex = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Base reflective cyan-blue glass gradient
        const grad = ctx.createLinearGradient(0, 0, 0, 512)
        grad.addColorStop(0, '#38BDF8')
        grad.addColorStop(0.5, '#0284C7')
        grad.addColorStop(1, '#0369A1')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, 512, 512)

        // Subtle dark spiral bands (signature of 30 St Mary Axe)
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.4)'
        ctx.lineWidth = 14
        for (let x = -512; x < 1024; x += 128) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x + 512, 512)
          ctx.stroke()
        }

        // Crisp white/silver structural diamond lattice grid
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 3.5

        const step = 48
        for (let x = -512; x < 1024; x += step) {
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x + 512, 512)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(x, 512)
          ctx.lineTo(x + 512, 0)
          ctx.stroke()
        }

        // Subtle warm interior office lights inside diamond panes
        for (let y = 24; y < 512; y += step) {
          for (let x = 24; x < 512; x += step) {
            if ((x + y * 2) % 96 === 0) {
              ctx.fillStyle = 'rgba(254, 240, 138, 0.45)'
              ctx.beginPath()
              ctx.arc(x, y, 6, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        }
      }
      const tex = new THREE.CanvasTexture(canvas)
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      tex.repeat.set(3, 3)
      return tex
    }

    const createCylinderGlassTex = (accentColor: string) => {
      const canvas = document.createElement('canvas')
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#0F2942'
        ctx.fillRect(0, 0, 256, 256)

        const rows = 12
        const h = 256 / rows
        for (let r = 0; r < rows; r++) {
          ctx.fillStyle = '#F8FAFC'
          ctx.fillRect(0, r * h, 256, 5)

          ctx.strokeStyle = '#1E293B'
          ctx.lineWidth = 2
          for (let x = 0; x < 256; x += 32) {
            ctx.beginPath()
            ctx.moveTo(x, r * h + 5)
            ctx.lineTo(x, (r + 1) * h)
            ctx.stroke()
          }

          ctx.fillStyle = accentColor
          ctx.fillRect(0, r * h + 5, 256, 2)
        }
      }
      const tex = new THREE.CanvasTexture(canvas)
      tex.wrapS = THREE.RepeatWrapping
      tex.wrapT = THREE.RepeatWrapping
      return tex
    }

    const createHelipadTex = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 128
      canvas.height = 128
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#374151'
        ctx.fillRect(0, 0, 128, 128)
        ctx.strokeStyle = '#FACC15'
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.arc(64, 64, 46, 0, Math.PI * 2)
        ctx.stroke()
        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 44px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('H', 64, 64)
      }
      return new THREE.CanvasTexture(canvas)
    }

    const diagridTex = createDiagridTex()
    const helipadTex = createHelipadTex()
    const stoneTex = createStoneFacadeTex('#E2E8F0', '#1E293B')
    const brownstoneTex = createStoneFacadeTex('#C29D78', '#0F172A')

    // 4. Urban Ground Base, Waterfront Bay & Golden Boulevard
    const worldGroup = new THREE.Group()
    scene.add(worldGroup)

    const landGeo = new THREE.BoxGeometry(11.5, 0.2, 9.2)
    const landMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.8, metalness: 0.1 })
    const landMesh = new THREE.Mesh(landGeo, landMat)
    landMesh.position.set(-0.6, -0.1, 0)
    landMesh.receiveShadow = true
    worldGroup.add(landMesh)

    const waterGeo = new THREE.PlaneGeometry(16, 16)
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x1E4E63,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.92,
    })
    const waterMesh = new THREE.Mesh(waterGeo, waterMat)
    waterMesh.rotation.x = -Math.PI / 2
    waterMesh.position.set(6.2, -0.06, 0)
    waterMesh.receiveShadow = true
    worldGroup.add(waterMesh)

    const seawallGeo = new THREE.BoxGeometry(0.24, 0.18, 9.2)
    const seawallMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, roughness: 0.7 })
    const seawall = new THREE.Mesh(seawallGeo, seawallMat)
    seawall.position.set(5.15, 0.05, 0)
    seawall.castShadow = true
    seawall.receiveShadow = true
    worldGroup.add(seawall)

    const promenadeGeo = new THREE.PlaneGeometry(0.8, 9.2)
    const promenadeMat = new THREE.MeshStandardMaterial({ color: 0xD1D5DB, roughness: 0.8 })
    const promenade = new THREE.Mesh(promenadeGeo, promenadeMat)
    promenade.rotation.x = -Math.PI / 2
    promenade.position.set(4.65, 0.01, 0)
    promenade.receiveShadow = true
    worldGroup.add(promenade)

    const avenueGeo = new THREE.PlaneGeometry(0.7, 9.2)
    const avenueMat = new THREE.MeshStandardMaterial({ color: 0x2A313C, roughness: 0.9 })
    const avenue = new THREE.Mesh(avenueGeo, avenueMat)
    avenue.rotation.x = -Math.PI / 2
    avenue.position.set(-0.2, 0.012, 0)
    avenue.receiveShadow = true
    worldGroup.add(avenue)

    const medianGeo = new THREE.PlaneGeometry(0.06, 9.2)
    const medianMat = new THREE.MeshBasicMaterial({ color: 0xFACC15 })
    const median = new THREE.Mesh(medianGeo, medianMat)
    median.rotation.x = -Math.PI / 2
    median.position.set(-0.2, 0.014, 0)
    worldGroup.add(median)

    for (let i = -3; i <= 3; i += 2) {
      const crossGeo = new THREE.PlaneGeometry(9.6, 0.36)
      const crossMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 })
      const crossRoad = new THREE.Mesh(crossGeo, crossMat)
      crossRoad.rotation.x = -Math.PI / 2
      crossRoad.position.set(-0.4, 0.011, i)
      crossRoad.receiveShadow = true
      worldGroup.add(crossRoad)
    }

    // Street Trees along sidewalks
    const treeTrunkGeo = new THREE.CylinderGeometry(0.015, 0.02, 0.1, 6)
    const treeTrunkMat = new THREE.MeshStandardMaterial({ color: 0x5C4033, roughness: 0.9 })
    const treeCrownGeo = new THREE.SphereGeometry(0.07, 8, 8)
    const treeCrownMat = new THREE.MeshStandardMaterial({ color: 0x228B22, roughness: 0.8 })

    const addTree = (x: number, z: number) => {
      const tg = new THREE.Group()
      tg.position.set(x, 0.01, z)
      const trunk = new THREE.Mesh(treeTrunkGeo, treeTrunkMat)
      trunk.position.y = 0.05
      tg.add(trunk)
      const crown = new THREE.Mesh(treeCrownGeo, treeCrownMat)
      crown.position.y = 0.14
      crown.castShadow = true
      tg.add(crown)
      worldGroup.add(tg)
    }

    for (let z = -4; z <= 4; z += 0.8) {
      addTree(4.3, z)
      addTree(-0.65, z)
      addTree(0.25, z)
    }

    // 5. Surrounding Architectural Context Mid-Rises
    const contextBlocksData = [
      { x: 3.8, z: -3.6, w: 0.6, d: 0.6, h: 1.2, mat: 'stone' },
      { x: 3.8, z: -2.4, w: 0.7, d: 0.5, h: 1.5, mat: 'curtain' },
      { x: 3.8, z: -1.2, w: 0.5, d: 0.7, h: 0.9, mat: 'brownstone' },
      { x: 3.8, z: 0.5, w: 0.6, d: 0.6, h: 1.4, mat: 'curtain' },
      { x: 3.8, z: 1.8, w: 0.7, d: 0.5, h: 1.8, mat: 'stone' },
      { x: 3.8, z: 3.4, w: 0.6, d: 0.7, h: 1.1, mat: 'brownstone' },
      { x: -0.9, z: -3.8, w: 0.6, d: 0.5, h: 0.8, mat: 'brownstone' },
      { x: -0.9, z: -1.8, w: 0.5, d: 0.6, h: 1.3, mat: 'stone' },
      { x: -0.9, z: 0.8, w: 0.6, d: 0.5, h: 1.6, mat: 'curtain' },
      { x: -0.9, z: 2.8, w: 0.5, d: 0.5, h: 0.7, mat: 'stone' },
      { x: 1.0, z: -3.4, w: 0.6, d: 0.6, h: 1.1, mat: 'stone' },
      { x: 1.0, z: -1.4, w: 0.7, d: 0.5, h: 1.5, mat: 'curtain' },
      { x: 1.0, z: 0.2, w: 0.5, d: 0.6, h: 0.9, mat: 'brownstone' },
      { x: 1.0, z: 2.4, w: 0.6, d: 0.5, h: 1.7, mat: 'stone' },
      { x: -3.2, z: -3.5, w: 0.5, d: 0.5, h: 1.0, mat: 'stone' },
      { x: -3.2, z: 1.8, w: 0.6, d: 0.6, h: 1.2, mat: 'curtain' },
      { x: -4.8, z: -2.2, w: 0.5, d: 0.6, h: 0.9, mat: 'brownstone' },
      { x: -4.8, z: 2.0, w: 0.6, d: 0.5, h: 1.3, mat: 'stone' },
    ]

    const defaultCurtainMat = new THREE.MeshStandardMaterial({
      map: createCurtainWallTex('#38BDF8', '#1E293B'),
      roughness: 0.2,
      metalness: 0.6,
    })
    const defaultStoneMat = new THREE.MeshStandardMaterial({
      map: stoneTex,
      roughness: 0.5,
      metalness: 0.1,
    })
    const defaultBrownstoneMat = new THREE.MeshStandardMaterial({
      map: brownstoneTex,
      roughness: 0.6,
      metalness: 0.1,
    })

    const addRooftopEquipment = (parent: THREE.Group, x: number, z: number, roofY: number, w: number, d: number) => {
      const pentGeo = new THREE.BoxGeometry(w * 0.45, 0.1, d * 0.45)
      pentGeo.translate(x, roofY + 0.05, z)
      const pentMesh = new THREE.Mesh(pentGeo, defaultStoneMat)
      pentMesh.castShadow = true
      parent.add(pentMesh)

      const chillerGeo = new THREE.BoxGeometry(0.12, 0.06, 0.1)
      chillerGeo.translate(x + w * 0.22, roofY + 0.03, z - d * 0.2)
      const chillerMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.8 })
      const chiller = new THREE.Mesh(chillerGeo, chillerMat)
      parent.add(chiller)

      const rimGeo = new THREE.RingGeometry(w * 0.4, w * 0.48, 4)
      const rimMat = new THREE.MeshBasicMaterial({ color: 0x475569, side: THREE.DoubleSide })
      const rim = new THREE.Mesh(rimGeo, rimMat)
      rim.rotation.x = Math.PI / 2
      rim.position.set(x, roofY + 0.005, z)
      parent.add(rim)
    }

    contextBlocksData.forEach(b => {
      const bGeo = new THREE.BoxGeometry(b.w, b.h, b.d)
      bGeo.translate(0, b.h / 2, 0)
      const mat = b.mat === 'curtain' ? defaultCurtainMat : b.mat === 'brownstone' ? defaultBrownstoneMat : defaultStoneMat
      const bMesh = new THREE.Mesh(bGeo, mat)
      bMesh.position.set(b.x, 0.01, b.z)
      bMesh.castShadow = true
      bMesh.receiveShadow = true
      worldGroup.add(bMesh)

      addRooftopEquipment(worldGroup, b.x, b.z, b.h, b.w, b.d)
    })

    // 6. The 12 Flagship Corporate Skyscraper Landmarks
    interface RecruiterTowerItem {
      data: ConstellationCompany
      group: THREE.Group
      mainMesh: THREE.Mesh
      beaconMesh: THREE.Mesh
      hitMesh: THREE.Mesh
      labelSprite: THREE.Sprite
      spotlight: THREE.SpotLight
      targetScaleY: number
      currentScaleY: number
      baseHeight: number
    }

    const towerItems: RecruiterTowerItem[] = []

    const createBadgeSprite = (name: string, lpa: number, color: string) => {
      const canvas = document.createElement('canvas')
      canvas.width = 230
      canvas.height = 68
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#17191C'
        ctx.beginPath()
        ctx.roundRect(6, 6, 218, 56, 28)
        ctx.fill()

        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.font = 'bold 20px Space Grotesk, sans-serif'
        ctx.fillStyle = '#FFFFFF'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText(name, 22, 34)

        ctx.font = 'bold 15px JetBrains Mono, monospace'
        ctx.fillStyle = color
        ctx.textAlign = 'right'
        ctx.fillText(`₹${lpa}L`, 208, 34)
      }
      const texture = new THREE.CanvasTexture(canvas)
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true })
      const sprite = new THREE.Sprite(spriteMat)
      sprite.scale.set(1.2, 0.35, 1)
      return sprite
    }

    CONSTELLATION_COMPANIES.forEach(company => {
      const tGroup = new THREE.Group()
      const [tx, , tz] = company.coords
      tGroup.position.set(tx, 0.01, tz)
      worldGroup.add(tGroup)

      // Base height proportional to package LPA, ensuring all buildings are impressive skyscrapers
      const h = (company.packageLPA / 50) * 1.5 + 1.2

      const brandCurtainTex = createCurtainWallTex(company.color, '#17191C')
      const cylinderTex = createCylinderGlassTex(company.color)

      const towerMat = new THREE.MeshStandardMaterial({
        map: brandCurtainTex,
        roughness: 0.15,
        metalness: 0.7,
      })

      let mainMesh: THREE.Mesh
      let beaconMesh!: THREE.Mesh

      if (company.buildingStyle === 'meta-gherkin') {
        // META (50 LPA): Seamless Aerodynamic Diagrid Lattice Skyscraper (30 St Mary Axe style)
        // Generated as a continuous smooth aerodynamic curved profile using LatheGeometry
        const points: THREE.Vector2[] = []
        const steps = 36
        for (let i = 0; i <= steps; i++) {
          const t = i / steps // 0 to 1
          const y = t * h
          // Smooth parabolic aerodynamic curvature:
          // Base radius: 0.28, gentle aerodynamic bulge in mid-section: 0.38, smooth rounded apex dome: 0.005
          const r = Math.max(0.005, 0.28 + 0.12 * Math.sin(t * Math.PI) - 0.275 * (t * t * t))
          points.push(new THREE.Vector2(r, y))
        }
        const gherkinGeo = new THREE.LatheGeometry(points, 36)
        const gherkinMat = new THREE.MeshStandardMaterial({
          map: diagridTex,
          color: 0xFFFFFF, // Pure reflective cyan/azure glass without dark muting
          roughness: 0.1,
          metalness: 0.85,
        })
        mainMesh = new THREE.Mesh(gherkinGeo, gherkinMat)
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        // Integrated Glowing Purple Apex Crown Ring (at top tip)
        const crownGeo = new THREE.TorusGeometry(0.05, 0.015, 8, 24)
        crownGeo.rotateX(Math.PI / 2)
        crownGeo.translate(0, h - 0.02, 0)
        const crownMat = new THREE.MeshStandardMaterial({
          color: 0x8B5CF6,
          emissive: 0x8B5CF6,
          emissiveIntensity: 1.2,
        })
        beaconMesh = new THREE.Mesh(crownGeo, crownMat)
        beaconMesh.userData = { company }
        tGroup.add(beaconMesh)

        // Integrated Needle Spire seamlessly atop the apex
        const spireGeo = new THREE.CylinderGeometry(0.006, 0.018, 0.36, 8)
        spireGeo.translate(0, h + 0.18, 0)
        const spireMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.95 })
        const spire = new THREE.Mesh(spireGeo, spireMat)
        tGroup.add(spire)
      } else if (company.buildingStyle === 'google-stepped') {
        // GOOGLE (45 LPA): Stepped Terraced Glass High-Rise with Roof Gardens & Atrium
        const t1Geo = new THREE.BoxGeometry(0.58, h * 0.58, 0.58)
        t1Geo.translate(0, (h * 0.58) / 2, 0)
        mainMesh = new THREE.Mesh(t1Geo, towerMat)
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        // Tier 2 Setback
        const t2Geo = new THREE.BoxGeometry(0.44, h * 0.42, 0.44)
        t2Geo.translate(0, h * 0.58 + (h * 0.42) / 2, 0)
        const t2 = new THREE.Mesh(t2Geo, towerMat)
        t2.castShadow = true
        t2.userData = { company }
        tGroup.add(t2)

        // Google 4-Color Rooftop Band
        const gColors = [0x4285F4, 0xEA4335, 0xFBBC05, 0x34A853]
        gColors.forEach((gc, idx) => {
          const bar = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.04, 0.04),
            new THREE.MeshBasicMaterial({ color: gc })
          )
          bar.position.set(-0.15 + idx * 0.1, h + 0.02, 0.22)
          tGroup.add(bar)
        })
      } else if (company.buildingStyle === 'microsoft-redmond') {
        // MICROSOFT (42 LPA): Twin Angular Crystalline Glass Towers with Connecting Skybridge
        const northGeo = new THREE.BoxGeometry(0.36, h * 0.95, 0.38)
        northGeo.translate(-0.2, (h * 0.95) / 2, 0)
        mainMesh = new THREE.Mesh(northGeo, towerMat)
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        const southGeo = new THREE.BoxGeometry(0.34, h * 0.78, 0.36)
        southGeo.translate(0.22, (h * 0.78) / 2, 0)
        const south = new THREE.Mesh(southGeo, towerMat)
        south.castShadow = true
        south.userData = { company }
        tGroup.add(south)

        // Overhead Glass Skybridge
        const bridgeGeo = new THREE.BoxGeometry(0.44, 0.12, 0.15)
        bridgeGeo.translate(0.01, h * 0.5, 0)
        const bridge = new THREE.Mesh(bridgeGeo, new THREE.MeshStandardMaterial({
          color: 0x38BDF8,
          transparent: true,
          opacity: 0.85,
          roughness: 0.1,
          metalness: 0.8,
        }))
        bridge.userData = { company }
        tGroup.add(bridge)

        // Microsoft 4-Color Crown
        const logoColors = [0xF25022, 0x7FBA00, 0x00A4EF, 0xFFB900]
        const logoPositions = [[-0.05, 0.05], [0.05, 0.05], [-0.05, -0.05], [0.05, -0.05]]
        logoPositions.forEach(([ox, oz], idx) => {
          const tile = new THREE.Mesh(
            new THREE.BoxGeometry(0.08, 0.04, 0.08),
            new THREE.MeshBasicMaterial({ color: logoColors[idx] })
          )
          tile.position.set(-0.2 + ox, h * 0.95 + 0.03, oz)
          tGroup.add(tile)
        })
      } else if (company.buildingStyle === 'nvidia-monolith') {
        // NVIDIA (42 LPA): Faceted Triangular Obsidian Monolith Skyscraper
        const triGeo = new THREE.CylinderGeometry(0.48, 0.48, h, 3)
        triGeo.translate(0, h / 2, 0)
        const triMat = new THREE.MeshStandardMaterial({
          map: brandCurtainTex,
          color: new THREE.Color(0x0F172A),
          roughness: 0.2,
          metalness: 0.85,
        })
        mainMesh = new THREE.Mesh(triGeo, triMat)
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        // Glowing NVIDIA Emerald Edge Linework
        const wireGeo = new THREE.WireframeGeometry(triGeo)
        const wireLines = new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({ color: 0x76B900 }))
        tGroup.add(wireLines)

        // Triangular Rooftop Observatory
        const triCap = new THREE.Mesh(
          new THREE.CylinderGeometry(0.42, 0.48, 0.14, 3),
          new THREE.MeshStandardMaterial({ color: 0x76B900, roughness: 0.3, metalness: 0.7 })
        )
        triCap.rotation.y = Math.PI / 3
        triCap.position.y = h + 0.07
        triCap.userData = { company }
        tGroup.add(triCap)
      } else if (company.buildingStyle === 'amazon-spheres') {
        // AMAZON (38 LPA): Doppler Glass Skyscraper + The 3 Botanical Geodesic Spheres
        const dopplerGeo = new THREE.BoxGeometry(0.5, h, 0.45)
        dopplerGeo.translate(-0.14, h / 2, -0.08)
        mainMesh = new THREE.Mesh(dopplerGeo, towerMat)
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        // The 3 Intersecting Glass Geodesic Spheres at the base plaza
        const sphereMat = new THREE.MeshPhysicalMaterial({
          color: 0xBAE6FD,
          roughness: 0.08,
          metalness: 0.9,
          transparent: true,
          opacity: 0.8,
          clearcoat: 1.0,
        })
        const wireMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, wireframe: true, transparent: true, opacity: 0.5 })

        const addSph = (r: number, sx: number, sy: number, sz: number) => {
          const sGeo = new THREE.IcosahedronGeometry(r, 2)
          sGeo.translate(sx, sy, sz)
          const sm = new THREE.Mesh(sGeo, sphereMat)
          sm.userData = { company }
          tGroup.add(sm)
          const sw = new THREE.Mesh(sGeo, wireMat)
          tGroup.add(sw)

          const tg = new THREE.SphereGeometry(r * 0.45, 8, 8)
          tg.translate(sx, sy - r * 0.2, sz)
          tGroup.add(new THREE.Mesh(tg, new THREE.MeshStandardMaterial({ color: 0x16A34A })))
        }

        addSph(0.24, 0.22, 0.24, 0.18)
        addSph(0.18, 0.06, 0.18, 0.34)
        addSph(0.16, 0.38, 0.16, 0.1)
      } else if (company.buildingStyle === 'flipkart-tower') {
        // FLIPKART (32 LPA): Stepped Blue & Yellow Modern Skyscraper + Rooftop Helipad
        const fMainGeo = new THREE.BoxGeometry(0.48, h, 0.48)
        fMainGeo.translate(-0.06, h / 2, 0)
        mainMesh = new THREE.Mesh(fMainGeo, towerMat)
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        // Stepped Side Wing
        const fSideGeo = new THREE.BoxGeometry(0.38, h * 0.72, 0.4)
        fSideGeo.translate(0.26, (h * 0.72) / 2, 0.06)
        const fSide = new THREE.Mesh(fSideGeo, towerMat)
        fSide.castShadow = true
        fSide.userData = { company }
        tGroup.add(fSide)

        // Signature Flipkart Bright Yellow Architectural Cantilever Framing Bands
        const frame1 = new THREE.Mesh(
          new THREE.BoxGeometry(0.52, 0.08, 0.52),
          new THREE.MeshStandardMaterial({ color: 0xFACC15, roughness: 0.2, metalness: 0.6 })
        )
        frame1.position.set(-0.06, h * 0.62, 0)
        tGroup.add(frame1)

        const frame2 = new THREE.Mesh(
          new THREE.BoxGeometry(0.42, 0.06, 0.44),
          new THREE.MeshStandardMaterial({ color: 0xFACC15, roughness: 0.2, metalness: 0.6 })
        )
        frame2.position.set(0.26, h * 0.48, 0.06)
        tGroup.add(frame2)

        // Certified Rooftop Helipad
        const heliGeo = new THREE.BoxGeometry(0.4, 0.025, 0.4)
        heliGeo.translate(-0.06, h + 0.015, 0)
        const helipad = new THREE.Mesh(heliGeo, new THREE.MeshStandardMaterial({ map: helipadTex }))
        helipad.userData = { company }
        tGroup.add(helipad)
      } else if (company.buildingStyle === 'servicenow-cylinder') {
        // SERVICENOW (30 LPA): Cylindrical High-Rise Glass Skyscraper with Balcony Bands
        const snGeo = new THREE.CylinderGeometry(0.3, 0.32, h, 24)
        snGeo.translate(0, h / 2, 0)
        mainMesh = new THREE.Mesh(snGeo, new THREE.MeshStandardMaterial({
          map: cylinderTex,
          roughness: 0.15,
          metalness: 0.7,
        }))
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        // Cascading Sky Terraces
        const tMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, roughness: 0.5 })
        const t1 = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.04, 0.2), tMat)
        t1.position.set(0.18, h * 0.76, 0)
        tGroup.add(t1)

        const t2 = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.04, 0.16), tMat)
        t2.position.set(0.16, h * 0.88, 0)
        tGroup.add(t2)

        // Cyan Halo Crown
        const halo = new THREE.Mesh(
          new THREE.RingGeometry(0.26, 0.33, 24),
          new THREE.MeshBasicMaterial({ color: 0x06B6D4, side: THREE.DoubleSide })
        )
        halo.rotation.x = Math.PI / 2
        halo.position.y = h + 0.02
        tGroup.add(halo)
      } else if (company.buildingStyle === 'oracle-redwood') {
        // ORACLE (28 LPA): Twin Mirrored Cylindrical Towers on Reflection Lagoon
        const c1Geo = new THREE.CylinderGeometry(0.22, 0.24, h, 24)
        c1Geo.translate(-0.16, h / 2, 0)
        mainMesh = new THREE.Mesh(c1Geo, towerMat)
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        const c2Geo = new THREE.CylinderGeometry(0.22, 0.24, h * 0.84, 24)
        c2Geo.translate(0.16, (h * 0.84) / 2, 0)
        const c2 = new THREE.Mesh(c2Geo, towerMat)
        c2.castShadow = true
        c2.userData = { company }
        tGroup.add(c2)

        // Reflection Lagoon Basin
        const lagoon = new THREE.Mesh(
          new THREE.CylinderGeometry(0.55, 0.55, 0.02, 32),
          new THREE.MeshStandardMaterial({ color: 0x0C4A6E, roughness: 0.05, metalness: 0.9 })
        )
        lagoon.position.y = 0.015
        tGroup.add(lagoon)

        // Red Crown Logo Ring
        const rBand = new THREE.Mesh(
          new THREE.CylinderGeometry(0.225, 0.225, 0.08, 24),
          new THREE.MeshBasicMaterial({ color: 0xEF4444 })
        )
        rBand.position.set(-0.16, h - 0.05, 0)
        tGroup.add(rBand)
      } else if (company.buildingStyle === 'infosys-tower') {
        // INFOSYS (9.5 LPA): Stepped Tech Skyscraper + Tilted Ellipsoid Spaceship Dome at Base
        const iMainGeo = new THREE.BoxGeometry(0.46, h, 0.46)
        iMainGeo.translate(-0.1, h / 2, -0.08)
        mainMesh = new THREE.Mesh(iMainGeo, towerMat)
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        // Famous Tilted Glass Ellipsoid "Spaceship" at the entrance plaza
        const eggGeo = new THREE.SphereGeometry(0.26, 20, 20)
        eggGeo.scale(1.2, 0.8, 1.4)
        eggGeo.rotateZ(0.25)
        eggGeo.translate(0.24, 0.22, 0.22)
        const egg = new THREE.Mesh(eggGeo, new THREE.MeshStandardMaterial({
          map: brandCurtainTex,
          color: new THREE.Color(0x1E40AF),
          roughness: 0.1,
          metalness: 0.9,
        }))
        egg.userData = { company }
        tGroup.add(egg)

        // Metallic ring around the spaceship dome
        const tor = new THREE.Mesh(
          new THREE.TorusGeometry(0.28, 0.012, 8, 24),
          new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.9 })
        )
        tor.rotation.x = Math.PI / 2
        tor.rotation.y = 0.25
        tor.position.set(0.24, 0.22, 0.22)
        tGroup.add(tor)
      } else if (company.buildingStyle === 'tcs-tower') {
        // TCS (11.5 LPA): Classic Manhattan High-Rise with Aerodynamic Butterfly Facade Wings
        const spineGeo = new THREE.BoxGeometry(0.3, h, 0.54)
        spineGeo.translate(0, h / 2, 0)
        mainMesh = new THREE.Mesh(spineGeo, towerMat)
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        // Curved aerodynamic wings
        const wMat = new THREE.MeshStandardMaterial({ map: brandCurtainTex, roughness: 0.2, metalness: 0.7 })
        const w1 = new THREE.Mesh(new THREE.BoxGeometry(0.28, h * 0.75, 0.35), wMat)
        w1.rotation.y = 0.4
        w1.position.set(-0.28, (h * 0.75) / 2, 0.06)
        w1.castShadow = true
        w1.userData = { company }
        tGroup.add(w1)

        const w2 = new THREE.Mesh(new THREE.BoxGeometry(0.28, h * 0.75, 0.35), wMat)
        w2.rotation.y = -0.4
        w2.position.set(0.28, (h * 0.75) / 2, 0.06)
        w2.castShadow = true
        w2.userData = { company }
        tGroup.add(w2)
      } else if (company.buildingStyle === 'cognizant-techno') {
        // COGNIZANT (9.2 LPA): Multi-Tiered Cylindrical Glass Skyscraper with Sky-Gardens
        const ct1Geo = new THREE.CylinderGeometry(0.38, 0.4, h * 0.52, 24)
        ct1Geo.translate(0, (h * 0.52) / 2, 0)
        mainMesh = new THREE.Mesh(ct1Geo, new THREE.MeshStandardMaterial({ map: cylinderTex, roughness: 0.2, metalness: 0.7 }))
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        const ct2Geo = new THREE.CylinderGeometry(0.28, 0.3, h * 0.48, 24)
        ct2Geo.translate(0, h * 0.52 + (h * 0.48) / 2, 0)
        const ct2 = new THREE.Mesh(ct2Geo, new THREE.MeshStandardMaterial({ map: cylinderTex, roughness: 0.2, metalness: 0.7 }))
        ct2.castShadow = true
        ct2.userData = { company }
        tGroup.add(ct2)

        const gRing = new THREE.Mesh(
          new THREE.RingGeometry(0.29, 0.38, 24),
          new THREE.MeshBasicMaterial({ color: 0x15803D, side: THREE.DoubleSide })
        )
        gRing.rotation.x = Math.PI / 2
        gRing.position.y = h * 0.52 + 0.005
        tGroup.add(gRing)
      } else {
        // WIPRO (9.0 LPA): High-Rise Corporate Tower with Central Rotunda Clock Dome
        const rotGeo = new THREE.CylinderGeometry(0.26, 0.28, h * 0.9, 24)
        rotGeo.translate(0, (h * 0.9) / 2, 0)
        mainMesh = new THREE.Mesh(rotGeo, new THREE.MeshStandardMaterial({ map: cylinderTex, roughness: 0.2, metalness: 0.6 }))
        mainMesh.castShadow = true
        mainMesh.userData = { company }
        tGroup.add(mainMesh)

        const rotDome = new THREE.Mesh(
          new THREE.SphereGeometry(0.26, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
          new THREE.MeshStandardMaterial({ color: 0xFB923C, metalness: 0.8, roughness: 0.2 })
        )
        rotDome.position.y = h * 0.9
        tGroup.add(rotDome)

        const wingMatW = new THREE.MeshStandardMaterial({ map: brandCurtainTex, roughness: 0.2, metalness: 0.6 })
        const w1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, h * 0.6, 0.24), wingMatW)
        w1.rotation.y = 0.45
        w1.position.set(-0.32, (h * 0.6) / 2, 0.06)
        w1.castShadow = true
        w1.userData = { company }
        tGroup.add(w1)

        const w2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, h * 0.6, 0.24), wingMatW)
        w2.rotation.y = -0.45
        w2.position.set(0.32, (h * 0.6) / 2, 0.06)
        w2.castShadow = true
        w2.userData = { company }
        tGroup.add(w2)
      }

      // For standard flat-roofed towers, add rooftop equipment, mechanicals & cap
      if (company.buildingStyle !== 'meta-gherkin') {
        addRooftopEquipment(tGroup, 0, 0, h, 0.48, 0.48)

        // Rooftop Glowing Beacon Cap
        const capGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 8)
        capGeo.translate(0, h + 0.06, 0)
        const capMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(company.color),
          emissive: new THREE.Color(company.color),
          emissiveIntensity: 0.8,
          roughness: 0.1,
        })
        beaconMesh = new THREE.Mesh(capGeo, capMat)
        beaconMesh.userData = { company }
        tGroup.add(beaconMesh)

        // Telecommunications Spire Mast
        const mastGeo = new THREE.CylinderGeometry(0.01, 0.02, 0.4, 6)
        mastGeo.translate(0, h + 0.28, 0)
        const mastMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.9 })
        const mast = new THREE.Mesh(mastGeo, mastMat)
        tGroup.add(mast)
      }

      // Floating 3D Badge Sprite
      const labelSprite = createBadgeSprite(company.name, company.packageLPA, company.color)
      labelSprite.position.set(0, h + 0.55, 0)
      labelSprite.userData = { company }
      tGroup.add(labelSprite)

      // Dedicated Transparent Hit Cylinder covering the entire building for 100% reliable clicks
      const hitGeo = new THREE.CylinderGeometry(0.65, 0.65, h + 1.2, 16)
      hitGeo.translate(0, (h + 1.2) / 2, 0)
      const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
      const hitMesh = new THREE.Mesh(hitGeo, hitMat)
      hitMesh.userData = { company }
      tGroup.add(hitMesh)

      // Vertical Spotlight Beam on Selection
      const spotlight = new THREE.SpotLight(new THREE.Color(company.color), 0, 12, Math.PI / 5, 0.5)
      spotlight.position.set(0, h + 3.2, 0)
      spotlight.target = mainMesh
      tGroup.add(spotlight)

      towerItems.push({
        data: company,
        group: tGroup,
        mainMesh: mainMesh,
        beaconMesh: beaconMesh,
        hitMesh: hitMesh,
        labelSprite: labelSprite,
        spotlight: spotlight,
        targetScaleY: 1,
        currentScaleY: 1,
        baseHeight: h,
      })
    })

    // 7. Interactive 360° Orbit, Pan & Zoom Controls
    let isDragging = false
    let startPointerX = 0
    let startPointerY = 0
    let prevMouseX = 0
    let prevMouseY = 0
    let sphericalTheta = Math.PI / 4
    let sphericalPhi = Math.PI / 3.4
    let sphericalRadius = 10.5
    const lookTarget = new THREE.Vector3(-0.3, 0.6, 0.2)

    const updateCameraFromSpherical = () => {
      camera.position.x = lookTarget.x + sphericalRadius * Math.sin(sphericalPhi) * Math.sin(sphericalTheta)
      camera.position.y = lookTarget.y + sphericalRadius * Math.cos(sphericalPhi)
      camera.position.z = lookTarget.z + sphericalRadius * Math.sin(sphericalPhi) * Math.cos(sphericalTheta)
      camera.lookAt(lookTarget)
    }

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      startPointerX = e.clientX
      startPointerY = e.clientY
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const rawX = ((e.clientX - rect.left) / width) * 2 - 1
      const rawY = -(((e.clientY - rect.top) / height) * 2 - 1)

      mouse.x = rawX
      mouse.y = rawY

      parallaxX = Math.max(-1, Math.min(1, rawX))
      parallaxY = Math.max(-1, Math.min(1, rawY))

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        prevMouseX = e.clientX
        prevMouseY = e.clientY

        sphericalTheta -= deltaX * 0.007
        sphericalPhi = Math.max(0.25, Math.min(Math.PI / 2 - 0.08, sphericalPhi - deltaY * 0.007))
        updateCameraFromSpherical()
      }
    }

    let currentHoveredCompany: ConstellationCompany | null = null
    let lastHoveredId: string | null = null

    const onMouseUp = (e: MouseEvent) => {
      isDragging = false
      const dist = Math.hypot(e.clientX - startPointerX, e.clientY - startPointerY)
      // If user clicked (and didn't drag to orbit) on a building, trigger selection
      if (dist < 6 && currentHoveredCompany) {
        onSelectCompanyRef.current(currentHoveredCompany)
      }
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      sphericalRadius = Math.max(5.5, Math.min(15.5, sphericalRadius + e.deltaY * 0.008))
      updateCameraFromSpherical()
    }

    const mouse = new THREE.Vector2(-999, -999)
    let parallaxX = 0
    let parallaxY = 0

    const onMouseEnter = () => {}
    const onMouseLeave = () => {
      mouse.set(-999, -999)
      parallaxX = 0
      parallaxY = 0
      currentHoveredCompany = null
      if (lastHoveredId !== null) {
        lastHoveredId = null
        setHoveredCompany(null)
        setTooltipPos(null)
      }
    }

    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)

    const raycaster = new THREE.Raycaster()

    // 8. Animation Loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()

      // Water subtle wave animation
      waterMesh.position.y = -0.06 + Math.sin(elapsedTime * 1.5) * 0.008

      // Slow ambient world drift when not actively dragging
      if (!isDragging && perspectiveRef.current === 'iso') {
        sphericalTheta += 0.0006
        updateCameraFromSpherical()
      }

      // Smooth mouse parallax
      const parallaxTargetX = lookTarget.x + parallaxX * 0.35
      const parallaxTargetY = lookTarget.y + parallaxY * 0.2
      currentLookAt.x += (parallaxTargetX - currentLookAt.x) * 0.05
      currentLookAt.y += (parallaxTargetY - currentLookAt.y) * 0.05
      camera.lookAt(currentLookAt)

      // Perspective Mode Transitions
      const camTarget = getCamTarget(perspectiveRef.current)
      if (perspectiveRef.current !== 'iso') {
        camera.position.lerp(camTarget.pos, 0.04)
        currentLookAt.lerp(camTarget.look, 0.04)
        camera.lookAt(currentLookAt)
      }

      // Update Building Heights & Highlighting
      const activeId = activeCompanyRef.current
      const tierFilter = selectedTierRef.current

      towerItems.forEach(item => {
        const isMatch = tierFilter === 'all' || item.data.tier === tierFilter
        const isActive = item.data.id === activeId

        item.targetScaleY = isMatch ? (isActive ? 1.25 : 1.0) : 0.35
        item.currentScaleY += (item.targetScaleY - item.currentScaleY) * 0.08
        item.group.scale.y = item.currentScaleY

        const bounce = Math.sin(elapsedTime * 2.5 + item.data.coords[0] * 2) * 0.08
        item.labelSprite.position.y = (item.baseHeight + 0.55) * item.currentScaleY + bounce
        item.labelSprite.visible = isMatch

        if (isActive) {
          item.spotlight.intensity = 6.5
          item.spotlight.target = item.mainMesh
          ;(item.beaconMesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
            1.2 + Math.sin(elapsedTime * 4) * 0.6
        } else {
          item.spotlight.intensity = 0
          ;(item.beaconMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = isMatch ? 0.6 : 0.1
        }
      })

      // Raycasting for Hover Tooltip & Cursor State
      if (mouse.x > -2 && mouse.y > -2) {
        raycaster.setFromCamera(mouse, camera)
        const hitMeshes = towerItems.flatMap(t => [t.hitMesh, t.mainMesh, t.beaconMesh, t.labelSprite])
        const intersects = raycaster.intersectObjects(hitMeshes, true)

        let foundCompany: ConstellationCompany | null = null
        if (intersects.length > 0) {
          for (const hit of intersects) {
            let curr: THREE.Object3D | null = hit.object
            while (curr && !foundCompany) {
              if (curr.userData && curr.userData.company) {
                foundCompany = curr.userData.company as ConstellationCompany
              }
              curr = curr.parent
            }
            if (foundCompany) break
          }
        }

        currentHoveredCompany = foundCompany

        // ONLY trigger React state update when the hovered building ID actually changes!
        const foundId = foundCompany ? foundCompany.id : null
        if (foundId !== lastHoveredId) {
          lastHoveredId = foundId
          setHoveredCompany(foundCompany)
          if (foundCompany) {
            const screenX = ((mouse.x + 1) / 2) * width
            const screenY = ((-mouse.y + 1) / 2) * height
            setTooltipPos({ x: screenX, y: screenY })
          } else {
            setTooltipPos(null)
          }
        } else if (foundCompany && Math.abs(mouse.x) < 1 && Math.abs(mouse.y) < 1) {
          // Softly follow mouse while staying on the same building
          const screenX = ((mouse.x + 1) / 2) * width
          const screenY = ((-mouse.y + 1) / 2) * height
          setTooltipPos({ x: screenX, y: screenY })
        }

        el.style.cursor = foundCompany ? 'pointer' : isDragging ? 'grabbing' : 'grab'
      }

      renderer.render(scene, camera)
    }

    animate()

    // 9. Resize Observer
    const handleResize = () => {
      if (!el) return
      width = el.clientWidth || 600
      height = el.clientHeight || 480
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(el)

    // Cleanup
    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
      if (renderer.domElement && el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, []) // Empty dependency array: runs ONCE on mount, NEVER tears down, NEVER flickers!

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        cursor: 'grab',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* 3D GIS HUD Badge Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(23, 25, 28, 0.88)',
          backdropFilter: 'blur(8px)',
          border: '1.5px solid rgba(245, 255, 56, 0.4)',
          borderRadius: 8,
          padding: '5px 10px',
          color: '#FFFFFF',
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          zIndex: 10,
          pointerEvents: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}
      >
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#22C55E',
            boxShadow: '0 0 8px #22C55E',
            display: 'inline-block',
          }}
        />
        <span>REAL HQ ARCHITECTURE · 360° ORBIT</span>
      </div>

      {/* Perspective Preset Switcher */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          display: 'flex',
          gap: 4,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(23, 25, 28, 0.15)',
          borderRadius: 999,
          padding: '3px 4px',
          zIndex: 10,
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        }}
      >
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            setPerspective('iso')
          }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 800,
            padding: '3px 9px',
            borderRadius: 999,
            border: 'none',
            background: perspective === 'iso' ? '#17191C' : 'transparent',
            color: perspective === 'iso' ? '#F5FF38' : '#17191C',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          Aerial
        </button>
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            setPerspective('waterfront')
          }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 800,
            padding: '3px 9px',
            borderRadius: 999,
            border: 'none',
            background: perspective === 'waterfront' ? '#17191C' : 'transparent',
            color: perspective === 'waterfront' ? '#F5FF38' : '#17191C',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          Waterfront
        </button>
        <button
          type="button"
          onClick={e => {
            e.stopPropagation()
            setPerspective('skyline')
          }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 800,
            padding: '3px 9px',
            borderRadius: 999,
            border: 'none',
            background: perspective === 'skyline' ? '#17191C' : 'transparent',
            color: perspective === 'skyline' ? '#F5FF38' : '#17191C',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          Boulevard
        </button>
      </div>

      {/* Floating Raycast Tooltip with Real-World HQ Info */}
      {hoveredCompany && tooltipPos && (
        <div
          style={{
            position: 'absolute',
            left: `${tooltipPos.x + 14}px`,
            top: `${tooltipPos.y - 25}px`,
            pointerEvents: 'none',
            zIndex: 40,
            transform: 'translateY(-50%)',
          }}
        >
          <div
            style={{
              background: '#17191C',
              border: `2px solid ${hoveredCompany.color}`,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
              borderRadius: '10px',
              padding: '9px 13px',
              fontFamily: 'var(--font-body)',
              color: '#FFFFFF',
              minWidth: '220px',
              maxWidth: '280px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.98rem', color: '#FFFFFF' }}>
                {hoveredCompany.name}
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#17191C', background: hoveredCompany.color, padding: '1px 6px', borderRadius: '4px' }}>
                {hoveredCompany.packageRange.split('—')[0]}
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#93C5FD', marginTop: '3px', fontWeight: 600 }}>
              🏛️ {hoveredCompany.landmarkHQ}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94A3B8', marginTop: '2px', lineHeight: 1.3 }}>
              {hoveredCompany.architectureStory.slice(0, 75)}...
            </div>
            <div style={{ fontSize: '0.68rem', color: '#FACC15', marginTop: '4px', fontWeight: 700 }}>
              Click building to inspect OA blueprint →
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
