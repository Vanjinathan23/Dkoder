import React, { ReactNode } from 'react'
import './PageHeader.css'

interface PageHeaderProps {
  badge: string
  title: string
  description: string
  children?: ReactNode
}

export default function PageHeader({ badge, title, description, children }: PageHeaderProps) {
  return (
    <div className="page-hero">
      <div className="container">
        <span className="page-hero__badge">{badge}</span>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__desc">{description}</p>
        {children && <div className="page-hero__actions">{children}</div>}
      </div>
    </div>
  )
}
