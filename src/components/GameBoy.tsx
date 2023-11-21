import { useEffect, useState } from 'react'

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

export default function GameBoy({ width }:Props) {

    const [isMobile, setIsMobile] = useState(false)

    const [buttons, setButtons] = useState(initialButtonsContext)
    const [selectPressed, setSelectPressed] = useState(true)
    const [on, setOn] = useState(false)
    const [perspective, setPerspective] = useState<Perspective>({x: 0, y: 0})

    const unit = isMobile ? window.screen.width / 36 : width / 36
    const fontSize = unit < 8 ? 6 : 8
    const smallFontSize = unit < 8 ? 4 : 6

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

    // Clicks dPad
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

    const handleButtonPressed = (button:string) => {
        setButtons((prevState) => ({
            ...prevState,
            [button]: true
        }))
    }

    const resetButtons = () => {
        setButtons(initialButtonsContext)
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
                                <ButtonsContext.Provider value={{buttons, handleButtonPressed, resetButtons, dPad}}>
                                    <Tetris />
                                </ButtonsContext.Provider>
                                </GameBoyContext.Provider>
                               )
                            }
                        </div>
                    </div>
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
                            <div
                                id="arrowUp"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-t-xl"
                                onMouseDown={() => {
                                    handleButtonPressed('arrowUp')
                                }}
                                onMouseUp={() => {
                                    resetButtons()
                                }}
                                onMouseOut={() => {
                                    resetButtons()
                                }}
                            >
                            </div>
                        </div>
                        <div className='flex h-1/3'>
                            {/* ARROWLEFT */}
                            <div
                                id="arrowLeft"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-l-xl"
                                onMouseDown={() => {
                                    handleButtonPressed('arrowLeft')
                                }}
                                onMouseUp={() => {
                                    resetButtons()
                                }}
                                onMouseOut={() => {
                                    resetButtons()
                                }}
                            >
                            </div>
                            <div
                                id="center"
                                style={{ width: `${3 * unit}px`, fontSize: `${2 * unit}px` }}
                                className="bg-gray-900 text-gray-800 flex justify-center items-center"
                            >
                                &#9711;
                            </div>
                            {/* ARROWRIGHT */}
                            <div
                                id="arrowRight"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-r-xl"
                                onMouseDown={() => {
                                    handleButtonPressed('arrowRight')
                                }}
                                onMouseUp={() => {
                                    resetButtons()
                                }}
                                onMouseOut={() => {
                                    resetButtons()
                                }}
                            >
                            </div>
                        </div>
                        <div className='flex justify-center h-1/3'>
                            {/* ARROWDOWN */}
                            <div
                                id="arrowDown"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-b-xl"
                                onMouseDown={() => {
                                    handleButtonPressed('arrowDown')
                                }}
                                onMouseUp={() => {
                                    resetButtons()
                                }}
                                onMouseOut={() => {
                                    resetButtons()
                                }}
                            >
                            </div>
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
                            className={`bg-[#761d54] rounded-full border-2 border-[#6a1d4c] ${buttons.a ? 'border-2 border-gray-600 scale-95' : ''} hover:cursor-pointer`}
                            onMouseDown={() => {
                                handleButtonPressed('a')
                            }}
                            onMouseUp={() => {
                                resetButtons()
                            }}
                            onMouseOut={() => {
                                resetButtons()
                            }}
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
                            onMouseDown={() => {
                                handleButtonPressed('b')
                            }}
                            onMouseUp={() => {
                                resetButtons()
                            }}
                            onMouseOut={() => {
                                resetButtons()
                            }}
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
                                setSelectPressed(!selectPressed)
                            }}
                            onMouseDown={() => {
                                handleButtonPressed('select')
                            }}
                            onMouseUp={() => {
                                resetButtons()
                            }}
                            onMouseOut={() => {
                                resetButtons()
                            }}
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
                            onMouseDown={() => {
                                handleButtonPressed('start')
                            }}
                            onMouseUp={() => {
                                resetButtons()
                            }}
                            onMouseOut={() => {
                                resetButtons()
                            }}
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
                !isMobile && selectPressed &&
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