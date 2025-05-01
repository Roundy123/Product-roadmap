"use client";
import React from 'react';

export default function RotatingCube() {
  return (
    <>
      {/* Import Anton font globally */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
      `}</style>

      <div className="scene">
        <div className="cube">
          <div className="face face1">
            <div className="logo-text">
              <div>HYPER</div>
              <div>PRODUCT</div>
              <div>CLUB</div>
            </div>
          </div>
          <div className="face face2" />
          <div className="face face3" />
          <div className="face face4" />
          <div className="face face5" />
          <div className="face face6" />
        </div>
      </div>

      <style jsx>{`
        .scene {
          width: 200px;
          height: 200px;
          perspective: 600px;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 10s infinite linear;
        }
        .face {
          position: absolute;
          width: 200px;
          height: 200px;
          background: #D81818;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: hidden;
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
        .face1 { transform: rotateY(0deg) translateZ(100px); }
        .face2 { transform: rotateY(90deg) translateZ(100px); }
        .face3 { transform: rotateY(180deg) translateZ(100px); }
        .face4 { transform: rotateY(-90deg) translateZ(100px); }
        .face5 { transform: rotateX(90deg) translateZ(100px); }
        .face6 { transform: rotateX(-90deg) translateZ(100px); }

        .logo-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transform: skewX(-10deg);
          letter-spacing: -0.05em;
          font-family: 'Anton', sans-serif;
          font-size: 2.5rem;
          line-height: 1;
        //   padding: 50px;
          box-sizing: border-box;
        }

        @keyframes rotateCube {
          from { transform: scaleX(1.3) skewY(-9deg) rotateX(0deg) rotateY(0deg); }
          to   { transform: scaleX(1.3) skewY(-9deg) rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
    </>
  );
}
