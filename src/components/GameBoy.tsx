import { useState } from 'react'

import Tetris from "./Tetris"

type Props = {
    width: number
}

type Perspective = {
    x: -1 | 0 | 1,
    y: -1 | 0 | 1
}

export default function GameBoy({ width }:Props) {
    const [on, setOn] = useState(true)
    const [a, setA] = useState(false)
    const [b, setB] = useState(false)
    const [select, setSelect] = useState(false)
    const [start, setStart] = useState(false)
    const [perspective, setPerspective] = useState<Perspective>({x: 0, y: 0})

    const unit = width / 36
    const fontSize = unit < 8 ? 6 : 8
    const smallFontSize = unit < 8 ? 4 : 6

    const dPad = (x: -1 | 0 | 1, y: -1 | 0 | 1) => {
        setPerspective({x, y})
    }

    return (
        <div
            style={{ height: `${60.5 * unit}px` }} 
            className="flex items-center">
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
                                on && <Tetris w={20 * unit}/>
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
                        className="absolute flex flex-col justify-center items-center"
                    >
                        <div 
                            className="flex justify-center h-1/3"
                        >
                            <div
                                id="topArrow"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-t-xl"
                                onMouseDown={() => dPad(0, 1)}
                                onMouseUp={() => dPad(0, 0)}
                            >
                            </div>
                        </div>
                        <div className='flex h-1/3'>
                            <div
                                id="leftArrow"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-l-xl"
                                onMouseDown={() => dPad(-1, 0)}
                                onMouseUp={() => dPad(0, 0)}
                            >
                            </div>
                            <div
                                id="center"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900"
                            >
                            </div>
                            <div
                                id="rightArrow"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-r-xl"
                                onMouseDown={() => dPad(1, 0)}
                                onMouseUp={() => dPad(0, 0)}
                            >
                            </div>
                        </div>
                        <div className='flex justify-center h-1/3'>
                            <div
                                id="bottomArrow"
                                style={{ width: `${3 * unit}px` }}
                                className="bg-gray-900 rounded-b-xl"
                                onMouseDown={() => dPad(0, 1)}
                                onMouseUp={() => dPad(0, 0)}
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
                            className={`bg-[#761d54] rounded-full border-2 border-[#6a1d4c] ${a ? 'border-2 border-gray-600 scale-95' : ''} hover:cursor-pointer`}
                            onMouseDown={() => setA(true)}
                            onMouseUp={() => setA(false)}
                            onMouseLeave={() => {
                                if (a) setA(false)
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
                            className={`bg-[#761d54] rounded-full border-2 border-[#6a1d4c] ${b ? 'border-2 border-gray-600 scale-95' : ''} hover:cursor-pointer`}
                            onMouseDown={() => setB(true)}
                            onMouseUp={() => setB(false)}
                            onMouseLeave={() => {
                                if (b) setB(false)
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
                            className={`rounded bg-gray-500 border-2 border-gray-600 border-opacity-50 box-border ${select ? 'border-2 border-gray-600 scale-95' : ''} hover:cursor-pointer`}
                            onMouseDown={() => setSelect(true)}
                            onMouseUp={() => setSelect(false)}
                            onMouseLeave={() => {
                                if (select) setSelect(false)
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
                            className={`rounded bg-gray-500 border-2 border-gray-600 border-opacity-50 box-border ${start ? 'border-2 border-gray-600 scale-95' : ''} hover:cursor-pointer`}
                            onMouseDown={() => setStart(true)}
                            onMouseUp={() => setStart(false)}
                            onMouseLeave={() => {
                                if (start) setStart(false)
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
                        CYLB
                    </div> 
                </div>
            </div>
            <div
                id="switch"
                style={{ width: `${unit}px`, height: `${-0.5 * unit}px`, top: `${0}px`, left: `${ on ? 5 * unit : 4 * unit}px` }}
                className="absolute bg-gray-400 hover:cursor-pointer"
                onClick={() => {
                    setOn(!on)
                }}
            >
            </div>
        </div>
    )
}