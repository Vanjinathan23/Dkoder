import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function QuantumCoreCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    let isDisposed = false
    let animationFrameId = 0
    let isVisible = true

    const W = el.clientWidth || 400
    const H = el.clientHeight || 400

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    // Scene & Camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100)
    camera.position.set(0, 0, 5.2)

    // Studio Lights
    const amb = new THREE.AmbientLight(0xfffdf5, 2.5)
    scene.add(amb)

    const key = new THREE.DirectionalLight(0xffffff, 2.5)
    key.position.set(4, 5, 5)
    scene.add(key)

    const yellowLight = new THREE.PointLight(0xf5ff38, 4.0, 10, 1.2)
    yellowLight.position.set(0, 0, 1.5)
    scene.add(yellowLight)

    const violetLight = new THREE.PointLight(0x8875ff, 2.8, 10, 1.2)
    violetLight.position.set(-2, -2, 2)
    scene.add(violetLight)

    // Master Quantum Group
    const group = new THREE.Group()
    scene.add(group)

    // Resolved Sculptural Faceted Core (Octahedron + Torus)
    const coreGeo = new THREE.OctahedronGeometry(0.85, 0)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      emissive: 0xf5ff38,
      emissiveIntensity: 0.45,
      roughness: 0.1,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    group.add(coreMesh)

    // Inner Wireframe Prism
    const innerWireGeo = new THREE.IcosahedronGeometry(0.55, 1)
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0x8875ff,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    })
    const innerWire = new THREE.Mesh(innerWireGeo, innerWireMat)
    group.add(innerWire)

    // Concentric Energy Rings
    const ring1Geo = new THREE.TorusGeometry(1.3, 0.016, 12, 64)
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xf5ff38,
      emissive: 0xf5ff38,
      emissiveIntensity: 0.8,
      roughness: 0.2,
    })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 3
    group.add(ring1)

    const ring2Geo = new THREE.TorusGeometry(1.65, 0.014, 12, 64)
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x8875ff,
      emissive: 0x8875ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.y = Math.PI / 4
    ring2.rotation.x = -Math.PI / 6
    group.add(ring2)

    // Swarm Particles
    const particleCount = 180
    const particleGeo = new THREE.BufferGeometry()
    const pos = new Float32Array(particleCount * 3)
    const originalPos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.9 + Math.random() * 0.9

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      pos[i * 3]     = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      originalPos[i * 3]     = x
      originalPos[i * 3 + 1] = y
      originalPos[i * 3 + 2] = z
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xf5ff38,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    group.add(particles)

    // Pointer Interactivity
    let targetRotX = 0
    let targetRotY = 0

    const onPointerMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      targetRotY = x * 0.6
      targetRotX = -y * 0.4
    }

    el.addEventListener('mousemove', onPointerMove)

    // Resize Observer
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries[0]) return
      const { width, height } = entries[0].contentRect
      if (width === 0 || height === 0) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })
    resizeObserver.observe(el)

    // Intersection Observer
    const visObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0.1 })
    visObserver.observe(el)

    // Animation Loop
    const clock = new THREE.Clock()

    const animate = () => {
      if (isDisposed) return
      animationFrameId = requestAnimationFrame(animate)
      if (!isVisible) return

      const t = clock.getElapsedTime()

      // Smooth pointer rotation
      group.rotation.y += (targetRotY - group.rotation.y) * 0.06
      group.rotation.x += (targetRotX - group.rotation.x) * 0.06

      // Continuous rhythmic pulse
      coreMesh.rotation.y = t * 0.45
      coreMesh.rotation.z = t * 0.25
      innerWire.rotation.y = -t * 0.7
      ring1.rotation.z = t * 0.5
      ring2.rotation.x = -t * 0.4

      const pulse = 1 + Math.sin(t * 3.2) * 0.04
      coreMesh.scale.setScalar(pulse)

      particles.rotation.y = t * 0.15

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      el.removeEventListener('mousemove', onPointerMove)
      resizeObserver.disconnect()
      visObserver.disconnect()

      coreGeo.dispose()
      coreMat.dispose()
      innerWireGeo.dispose()
      innerWireMat.dispose()
      ring1Geo.dispose()
      ring1Mat.dispose()
      ring2Geo.dispose()
      ring2Mat.dispose()
      particleGeo.dispose()
      particleMat.dispose()

      renderer.dispose()
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  )
}
