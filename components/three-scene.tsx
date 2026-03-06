'use client'

import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Grid } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

// R3F v9 requires extending THREE elements
extend(THREE as any)

const DARK_COLORS = ['#7c3aed', '#a78bfa', '#c084fc', '#8b5cf6', '#ddd6fe']
const LIGHT_COLORS = ['#4c1d95', '#5b21b6', '#6d28d9', '#7c3aed', '#4338ca']

function AnimatedBox({
    initialPosition,
    colorIndex,
    isLight,
}: {
    initialPosition: [number, number, number]
    colorIndex: number
    isLight: boolean
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [targetPosition, setTargetPosition] = useState(
        new THREE.Vector3(...initialPosition)
    )
    const currentPosition = useRef(new THREE.Vector3(...initialPosition))
    const palette = isLight ? LIGHT_COLORS : DARK_COLORS
    const color = palette[colorIndex % palette.length]

    const getAdjacentIntersection = (current: THREE.Vector3) => {
        const directions = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]
        const randomDirection =
            directions[Math.floor(Math.random() * directions.length)]
        return new THREE.Vector3(
            current.x + randomDirection[0] * 3,
            0.5,
            current.z + randomDirection[1] * 3
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            const newPosition = getAdjacentIntersection(currentPosition.current)
            newPosition.x = Math.max(-15, Math.min(15, newPosition.x))
            newPosition.z = Math.max(-15, Math.min(15, newPosition.z))
            setTargetPosition(newPosition)
        }, 1200 + Math.random() * 800)

        return () => clearInterval(interval)
    }, [])

    useFrame(() => {
        if (meshRef.current) {
            currentPosition.current.lerp(targetPosition, 0.08)
            meshRef.current.position.copy(currentPosition.current)
            meshRef.current.rotation.y += 0.003
        }
    })

    return (
        <mesh ref={meshRef} position={initialPosition}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={color}
                transparent
                opacity={isLight ? 1.0 : 0.85}
                emissive={color}
                emissiveIntensity={isLight ? 0.0 : 0.15}
                roughness={isLight ? 0.6 : 0.3}
                metalness={isLight ? 0.0 : 0.2}
            />
            <lineSegments>
                <edgesGeometry
                    attach="geometry"
                    args={[new THREE.BoxGeometry(1, 1, 1)]}
                />
                <lineBasicMaterial
                    attach="material"
                    color={isLight ? '#3b0764' : '#c4b5fd'}
                    linewidth={isLight ? 2 : 1}
                    transparent
                    opacity={isLight ? 0.9 : 0.6}
                />
            </lineSegments>
        </mesh>
    )
}

function Scene() {
    const { resolvedTheme } = useTheme()
    const isLight = resolvedTheme === 'light'

    const initialPositions: [number, number, number][] = [
        [-9, 0.5, -9],
        [-3, 0.5, -3],
        [0, 0.5, 0],
        [3, 0.5, 3],
        [9, 0.5, 9],
        [-6, 0.5, 6],
        [6, 0.5, -6],
        [-12, 0.5, 0],
        [12, 0.5, 0],
        [0, 0.5, 12],
        [-9, 0.5, 6],
        [9, 0.5, -3],
    ]

    return (
        <>
            <ambientLight intensity={isLight ? 1.2 : 0.4} />
            <pointLight position={[10, 15, 10]} intensity={isLight ? 0.4 : 0.8} color={isLight ? '#6d28d9' : '#a78bfa'} />
            <pointLight position={[-10, 10, -10]} intensity={isLight ? 0.3 : 0.4} color={isLight ? '#7c3aed' : '#c084fc'} />
            <directionalLight position={[0, 20, 0]} intensity={isLight ? 0.8 : 0.3} color={isLight ? '#ffffff' : '#e9d5ff'} />
            <Grid
                renderOrder={-1}
                position={[0, 0, 0]}
                infiniteGrid
                cellSize={1}
                cellThickness={isLight ? 0.8 : 0.4}
                sectionSize={3}
                sectionThickness={isLight ? 1.6 : 0.8}
                sectionColor={isLight ? new THREE.Color(0.35, 0.1, 0.65) : new THREE.Color(0.45, 0.25, 0.75)}
                cellColor={isLight ? new THREE.Color(0.45, 0.2, 0.75) : new THREE.Color(0.3, 0.15, 0.5)}
                fadeDistance={50}
            />
            {initialPositions.map((position, index) => (
                <AnimatedBox
                    key={index}
                    initialPosition={position}
                    colorIndex={index}
                    isLight={isLight}
                />
            ))}
        </>
    )
}

export default function ThreeScene() {
    return (
        <Canvas
            shadows
            camera={{ position: [30, 30, 30], fov: 50 }}
            className="absolute inset-0"
            style={{ background: 'transparent' }}
        >
            <Scene />
        </Canvas>
    )
}
