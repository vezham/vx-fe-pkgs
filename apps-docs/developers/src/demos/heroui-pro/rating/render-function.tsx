// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { useState } from 'react'

import { Rating, RatingStarIcon } from '@vezham/react-pro-v3'

const StarOutlineIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      clipRule="evenodd"
      d="m9.194 5l.351.873l.94.064l3.197.217l-2.46 2.055l-.722.603l.23.914l.782 3.108l-2.714-1.704L8 10.629l-.798.5l-2.714 1.705l.782-3.108l.23-.914l-.723-.603l-2.46-2.055l3.198-.217l.94-.064l.35-.874L8 2.025zm-7.723-.292l3.943-.268L6.886.773C7.29-.231 8.71-.231 9.114.773l1.472 3.667l3.943.268c1.08.073 1.518 1.424.688 2.118L12.185 9.36l.964 3.832c.264 1.05-.886 1.884-1.802 1.31L8 12.4l-3.347 2.101c-.916.575-2.066-.26-1.802-1.309l.964-3.832L.783 6.826c-.83-.694-.391-2.045.688-2.118"
      fillRule="evenodd"
    />
  </svg>
)

export function RenderFunction() {
  const [value, setValue] = useState(0)

  return (
    <div className="flex flex-col items-center gap-3">
      <Rating aria-label="Rating" value={value} onValueChange={setValue}>
        {[1, 2, 3, 4, 5].map(v => (
          <Rating.Item key={v} value={v}>
            {({ isActive }) => (
              <span
                style={{
                  color: isActive
                    ? 'var(--color-warning)'
                    : 'var(--color-muted)',
                  display: 'flex',
                  height: 20,
                  width: 20
                }}>
                {isActive ? <RatingStarIcon /> : <StarOutlineIcon />}
              </span>
            )}
          </Rating.Item>
        ))}
      </Rating>
      <span className="text-muted text-sm">
        {value === 0
          ? 'No rating'
          : `${value} ${value === 1 ? 'star' : 'stars'}`}
      </span>
    </div>
  )
}
