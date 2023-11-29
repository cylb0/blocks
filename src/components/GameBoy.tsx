import { useEffect, useRef, useState } from 'react'

import Tetris from "./Tetris"
import { GameBoyContext } from '../contexts/useUnitContext'
import { ButtonsContext } from '../contexts/useButtonsContext'
import { ButtonsContextType } from '../types'

import { controls } from '../constants/constants'

type Props = {
    width: number
}

type Perspective = {
    x: -1 | 0 | 1,
    y: -1 | 0 | 1
}

const initialButtonsContext:ButtonsContextType = {
    a: false,
    b: false,
    arrowUp: false,
    arrowRight: false,
    arrowDown: false,
    arrowLeft: false,
    select: false,
    start: false
}

type ButtonsPressed = {
    a: boolean,
    b: boolean,
    arrowUp: boolean,
    arrowRight: boolean,
    arrowDown: boolean,
    arrowLeft: boolean,
    select: boolean,
    start: boolean
}
const initialButtonsPressed = {
    a: false,
    b: false,
    arrowUp: false,
    arrowRight: false,
    arrowDown: false,
    arrowLeft: false,
    select: false,
    start: false
}

export default function GameBoy({ width }:Props) {

    const [isMobile, setIsMobile] = useState(false)

    const [buttons, setButtons] = useState(initialButtonsContext)
    const [on, setOn] = useState(true)
    const [perspective, setPerspective] = useState<Perspective>({x: 0, y: 0})

    const unit = isMobile ? window.screen.width / 36 : width / 36
    const fontSize = unit < 8 ? 6 : 8
    const smallFontSize = unit < 8 ? 4 : 6

    const keyPressed = useRef<boolean>(false)
    const buttonsPressed = useRef<ButtonsPressed>(initialButtonsPressed)

    useEffect(() => {
        console.log(buttons)
    }, [buttons])

    // WINDOW.MATCHMEDIA for mobile gameboy scaling
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 500px)')
        setIsMobile(mediaQuery.matches)

        const handleMediaQueryChange = (event:MediaQueryListEvent) => setIsMobile(event.matches)
        mediaQuery.addEventListener('change', handleMediaQueryChange)
        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
        }
    }, [])

    // DPAD PESPECTIVE
    useEffect(() => {
        if (buttons.arrowRight) {
            setPerspective({x: 1, y: 0})
        }
        if (buttons.arrowDown) {
            setPerspective({x: 0, y: -1})
        }
        if (buttons.arrowLeft) {
            setPerspective({x: -1, y: 0})
        }
        if (buttons.arrowUp) {
            setPerspective({x: 0, y: 1})
        }
    }, [buttons])

    const dPad = (x: -1 | 0 | 1, y: -1 | 0 | 1) => {
        setPerspective({x, y})
    }

    const handleButtonPressed = (button: keyof ButtonsContextType) => {
        setButtons((prevState) => ({
            ...prevState,
            [button]: true
        }))
    }

    const pressButton = (button: keyof ButtonsContextType) => {
        buttonsPressed.current = {
            ...buttonsPressed.current,
            [button]: true
        }
    }
    const releaseButton = (button: keyof ButtonsContextType) => {
        buttonsPressed.current = {
            ...buttonsPressed.current,
            [button]: false
        }
    }

    useEffect(() => {
        
        const handleKeyUp = (e:KeyboardEvent) => {
            if (e.key === 's') {
                releaseButton('b')
                resetButton('b')
            }
            if (e.key === 'd') {
                releaseButton('a')
                resetButton('a')
            }
            if (e.key === 'ArrowDown') {
                releaseButton('arrowDown')
                resetButton('arrowDown')
            }
            if (e.key === 'ArrowLeft') {
                releaseButton('arrowLeft')
                resetButton('arrowLeft')
            }
            if (e.key === 'ArrowRight') {
                releaseButton('arrowRight')
                resetButton('arrowRight')
            }
            if (e.key === 'ArrowUp') {
                releaseButton('arrowUp')
                resetButton('arrowUp')
            }
            if (e.key === ' ') {
                releaseButton('start')
            }
            if (e.key === 'Control') {
                releaseButton('select')
            }
        }

        const handleKeyDown = (e:KeyboardEvent) => {
            e.preventDefault()
            
            if (e.key === 's') {
                if (!buttonsPressed.current.b) {
                    pressButton('b')
                    handleButtonPressed('b')
                }
            }
            if (e.key === 'd') {
                if (!buttonsPressed.current.a) {
                    pressButton('a')
                    handleButtonPressed('a')
                }
            }
            if (e.key === 'ArrowDown') {
                if (!buttonsPressed.current.arrowDown) {
                    pressButton('arrowDown')
                    handleButtonPressed('arrowDown')
                }
            }
            if (e.key === 'ArrowLeft') {
                if (!buttonsPressed.current.arrowLeft) {
                    pressButton('arrowLeft')
                    handleButtonPressed('arrowLeft')
                }
            }
            if (e.key === 'ArrowRight') {
                if (!buttonsPressed.current.arrowRight) {
                    pressButton('arrowRight')
                    handleButtonPressed('arrowRight')
                }
            }
            if (e.key === 'ArrowUp') {
                if (!buttonsPressed.current.arrowUp) {
                    pressButton('arrowUp')
                    handleButtonPressed('arrowUp')
                }
            }
            if (e.key === ' ') {
                if (!buttonsPressed.current.start) {
                    pressButton('start')
                    toggleButton('start')
                }
            }
            if (e.key === 'Control') {
                if (!buttonsPressed.current.select) {
                    pressButton('select')
                    toggleButton('select')
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    const resetButtons = () => {
        setButtons((prevState) => ({
            ...initialButtonsContext,
            ['select']: prevState.select
        }))
        dPad(0, 0)
    }
    const resetButton = (button: keyof ButtonsContextType) => {
        setButtons((prevState) => ({
            ...prevState,
            [button]: false
        }))
        dPad(0, 0)
    }
    const toggleButton = (button: keyof ButtonsContextType) => {
        setButtons((prevState) => ({
            ...prevState,
            [button]: !prevState[button] as boolean
        }))
        dPad(0, 0)
    }

    return (
        <div
            style={{ height: `${60.5 * unit}px` }} 
            className="flex items-center relative select-none">
            {/* Console */}
            <div
                id="box"
                style={{ width: `${36 * unit}px`, height: `${60 * unit}px`, borderBottomRightRadius: `${10 * unit}px`}}
                className="relative bg-gray-400 rounded-xl flex flex-col justify-between overflow-hidden"
            >
                <div>{keyPressed.current.toString()}</div>

                {/* ON/OFF */}
                <div 
                    style={{ height: `${2.5 * unit}px` }}
                    className="flex w-full justify-between"
                >
                    <div
                        style={{ height: `${2.5 * unit}px`, width: `${2 * unit}px` }}
                        className="bg-gray-400 w-full border-b-4 border-r-4 border-gray-500 border-opacity-50 box-border"
                    >
                    </div>
                    <div
                        style={{ height: `${2.5 * unit}px`, width: `${31 * unit}px` }}
                        className="flex justify-start bg-gray-400 w-full border-b-4 border-x-4 border-gray-500 border-opacity-50 box-border"
                    >
                        <div
                            id="onOff"
                            style={{ fontSize: `${fontSize}px`}}
                            className={`m-1 inline-block h-50 text-gray-400 bg-gray-500 bg-opacity-50 rounded-full p-1 hover:cursor-pointer`}
                            onClick={() => {
                                setOn(!on)
                                resetButtons()
                            }}
                            >
                            &#9664;OFF&#8226;ON&#9654;
                        </div> 
                    </div>
                    <div
                        style={{ height: `${2.5 * unit}px`, width: `${2 * unit}px` }}
                        className="bg-gray-400 w-full border-b-4 border-l-4 border-gray-500 border-opacity-50 box-border"
                    >
                    </div>
                </div>
                <div 
                    style={{ height: `${57 * unit}px` }}
                    className="flex flex-col items-center border-t-4 border-gray-500 border-opacity-50 box-border"
                >
                    {/* SCREEN */}
                    <div
                        id="screen-lense"
                        style={{ width: `${31 * unit}px`, height: `${24 * unit}px`, marginTop: `${unit}px`, borderBottomRightRadius: `${6 * unit}px`}}
                        className="relative bg-gray-600 flex justify-center items-center rounded-xl border-4 border-gray-700"
                    >
                        <div
                            id="battery"
                            style={{ top: `${9 * unit}px`, left: `${2 * unit}px`, width: `${unit}px`, height: `${unit}px` }}
                            className={`absolute rounded-full ${ on ? 'bg-red-600': 'bg-black'}`}
                        >
                        <p 
                            style={{ top: `${2 * unit}px`, left: `${-1.5 * unit}px`, fontSize: `${smallFontSize}px` }}
                            className="absolute text-gray-400"
                        >BATTERY</p>

                        </div>
                        <div
                            id="screen"
                            style={{ width: `${20 * unit}px`, height: `${18 * unit}px` }}
                            className="bg-[#9bbc0f]"
                        >
                            {
                                on && (
                                <GameBoyContext.Provider value={unit}>
                                <ButtonsContext.Provider value={{buttons, resetButton, resetButtons, dPad}}>
                                    <Tetris />
                                </ButtonsContext.Provider>
                                </GameBoyContext.Provider>
                               )
                            }
                        </div>
                    </div>
                    {/* MORGANBOY */}
                    <div id="morganBoy" style={{ marginLeft: `${5 * unit}px`}} className="w-full text-start">
                        <span style={{ fontFamily: 'Roboto', fontSize: `${1.5 * unit}px` }} className='font-black tracking-wide text-blue-800'>
                            Morgan</span>
                        <span style={{ fontFamily: 'Roboto', fontSize: `${2 * unit}px` }} className='font-black uppercase italic text-blue-800'>
                            GAME GUY</span>
                        <span style={{ fontFamily: 'Roboto', fontSize: `${unit}px` }} className='font-black uppercase italic text-blue-800'>
                            TM</span>
                    </div>

                    {/* DIRECTIONS */}
                    <div
                        id="directions"
                        style={{ 
                            width: `${9 * unit}px`, 
                            height: `${9 * unit}px`, 
                            left: `${2.5 * unit}px`,
                            top: `${36 * unit}px`, 
                            transform: `perspective(${5 * unit}px) rotateX(${perspective.y * 2}deg) rotateY(${perspective.x * 2}deg)`}}
                        className="absolute flex flex-col justify-center items-center hover:cursor-pointer"
                    >
                        <div 
                            className="flex justify-center h-1/3"
                        >
                            {/* ARROWUP */}
                            <button
                                id="arrowUp"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-t-xl"
                                onPointerDown={() => {
                                    handleButtonPressed('arrowUp')
                                }}
                                onPointerUp={() => {
                                    resetButton('arrowUp')
                                }}
                                onPointerOut={() => {
                                    resetButton('arrowUp')
                                }}
                                onContextMenu={(e) => e.preventDefault() }
                            />
                        </div>
                        <div className='flex h-1/3'>
                            {/* ARROWLEFT */}
                            <button
                                id="arrowLeft"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-l-xl"
                                onPointerDown={() => {
                                    handleButtonPressed('arrowLeft')
                                }}
                                onPointerUp={() => {
                                    resetButton('arrowLeft')
                                }}
                                onPointerOut={() => {
                                    resetButton('arrowLeft')
                                }}
                                onContextMenu={(e) => e.preventDefault() }
                            />
                            <div
                                id="center"
                                style={{ width: `${3 * unit}px`, fontSize: `${2 * unit}px` }}
                                className="bg-gray-900 text-gray-800 flex justify-center items-center"
                            >
                                &#9711;
                            </div>
                            {/* ARROWRIGHT */}
                            <button
                                id="arrowRight"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-r-xl"
                                onPointerDown={() => {
                                    handleButtonPressed('arrowRight')
                                }}
                                onPointerUp={() => {
                                    resetButton('arrowRight')
                                }}
                                onPointerOut={() => {
                                    resetButton('arrowRight')
                                }}
                                onContextMenu={(e) => e.preventDefault() }
                            />
                        </div>
                        <div className='flex justify-center h-1/3'>
                            {/* ARROWDOWN */}
                            <button
                                id="arrowDown"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-b-xl"
                                onPointerDown={() => {
                                    handleButtonPressed('arrowDown')
                                }}
                                onPointerUp={() => {
                                    resetButton('arrowDown')
                                }}
                                onPointerOut={() => {
                                    resetButton('arrowDown')
                                }}
                                onContextMenu={(e) => e.preventDefault() }
                            />
                        </div>
                    </div>
                    <div>
                        
                    </div>
                    {/* A BUTTON */}
                    <div
                        style={{ left: `${27 * unit}px`, top: `${37 * unit}px` }}
                        className="absolute flex flex-col items-center gap-3 rotate-[-26deg]">
                        <button
                            id="A"
                            style={{ width: `${5 * unit}px`, height: `${5 * unit}px` }}
                            className={`bg-[#761d54] focus:outline-none rounded-full border-2 border-[#6a1d4c] ${buttons.a ? 'border-2 border-gray-600 scale-95' : ''} hover:cursor-pointer`}
                            onPointerDown={() => {
                                if (!buttons.start) handleButtonPressed('a')
                            }}
                            onPointerUp={() => {
                                resetButton('a')
                                resetButton('start')
                            }}
                            onPointerOut={() => {
                                resetButton('a')
                            }}
                            onContextMenu={(e) => e.preventDefault() }
                        />
                        <div 
                            style={{ fontFamily: 'Montserrat Alternates, sans-serif', fontSize: `${1.5 * unit}px` }}
                            className='font-black text-blue-800'>
                            A</div>
                    </div>

                    {/* B BUTTON */}
                    <div 
                        style={{ left: `${21 * unit}px`, top: `${40 * unit}px` }}
                        className="absolute flex flex-col items-center gap-3 rotate-[-26deg]">
                        <button
                            id="B"
                            style={{ width: `${5 * unit}px`, height: `${5 * unit}px` }}
                            className={`bg-[#761d54] rounded-full border-2 border-[#6a1d4c] ${buttons.b ? 'border-2 border-gray-600 scale-95' : ''} hover:cursor-pointer`}
                            onPointerDown={() => {
                                handleButtonPressed('b')
                            }}
                            onPointerUp={() => {
                                resetButton('b')
                            }}
                            onPointerOut={() => {
                                resetButton('b')
                            }}
                            onContextMenu={(e) => e.preventDefault() }
                        />
                        <div 
                            style={{ fontFamily: 'Montserrat Alternates, sans-serif', fontSize: `${1.5 * unit}px` }}
                            className='font-black text-blue-800'>
                            B
                        </div>
                    </div>

                    {/* SELECT BUTTON */}
                    <div
                        style={{ top: `${50 * unit}px`, left: `${11 * unit}px` }}
                        className="absolute flex flex-col items-center gap-2 rotate-[-26deg]">
                        <button
                            id="select"
                            style={{ width: `${4 * unit}px`, height: `${unit}px` }}
                            className={`rounded bg-gray-500 border-2 border-gray-600 border-opacity-50 box-border ${buttons.select ? 'border-2 border-gray-600 scale-95' : ''} hover:cursor-pointer`}
                            onClick={() => {
                                toggleButton('select')
                            }}
                            onContextMenu={(e) => e.preventDefault() }
                        />
                        <div 
                            style={{ fontFamily: 'Montserrat Alternates, sans-serif', fontSize: `${unit}px` }}
                            className='font-black text-blue-800'>
                            SELECT
                        </div>
                    </div>

                    {/* START BUTTON */}
                    <div
                        style={{ top: `${50 * unit}px`, left: `${16.5 * unit}px` }}
                        className="absolute flex flex-col items-center gap-2 rotate-[-26deg]"
                    >
                        <button
                            id="start"
                            style={{ width: `${4 * unit}px`, height: `${unit}px` }}
                            className={`rounded bg-gray-500 border-2 border-gray-600 border-opacity-50 box-border ${buttons.start ? 'border-2 border-gray-600 scale-95' : ''} hover:cursor-pointer`}
                            onClick={() => {
                                toggleButton('start')
                            }}
                            onContextMenu={(e) => e.preventDefault() }
                        />
                        <div 
                            style={{ fontFamily: 'Montserrat Alternates, sans-serif', fontSize: `${unit}px` }}
                            className='font-black text-blue-800'>
                            START
                        </div>
                    </div>
                    
                    {/* Air flow */}
                    <div
                        style={{ top: `${51 * unit}px`, left: `${23 * unit}px`, gap: `${1.2 * unit}px` }}
                        className="absolute flex rotate-[-26deg]"
                    >
                        {Array.from({length: 6}).map((_, index) => (
                            <div
                                key={index}
                                style={{ height: `${6 * unit}px`, width: `${0.8 * unit}px` }} 
                                className="bg-gray-600 rounded">
                            </div>
                        ))}
                    </div>

                    {/* SIGNATURE */}
                    <div
                        id="onOff"
                        style={{ left: `${13 * unit}px`, bottom: `0px`, fontSize: `${fontSize}px`}}
                        className={`absolute mb-3 inline-block h-50 text-gray-400 bg-gray-500 bg-opacity-50 rounded-full p-1`}
                        >
                        <a href="https://www.cylb.fr">CYLB</a>
                    </div> 
                </div>
            </div>

            {/* INFO TOOLBOX */}
            {
                !isMobile && buttons.select &&
                <div
                    style={{ top: 0, left: `${36 * unit}px`, maxWidth: `${36 * unit}px`, marginLeft: `${unit}px` }}
                    className="absolute z-50 bg-quaternary p-5 rounded-xl">
                        <h2 className="text-center text-xl">Raccourcis clavier</h2>
                    {
                        Object.entries(controls).map(([key, value]) => (
                            <div 
                                key={key}
                                className="my-2">
                                <span className="font-black text-primary">{key}</span>: <span className="text-secondary">{value}</span>
                            </div>
                        ))
                    }
                </div>
            }
                
            {/* Switch ON/OFF */}
            <div
                id="switch"
                style={{ width: `${unit}px`, height: `${0.5 * unit}px`, top: `${0}px`, left: `${ on ? 6 * unit : 4 * unit}px` }}
                className="absolute bg-gray-400 hover:cursor-pointer outline-none !important"
                onClick={() => {
                    setOn(!on)
                }}
            >
            </div>
        </div>
    )
}