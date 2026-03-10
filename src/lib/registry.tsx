'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({
    children,
}: {
    children: React.ReactNode
}) {
    // Only create the stylesheet on the server
    const [styledComponentsStyleSheet] = useState(() => {
        if (typeof window === 'undefined') {
            return new ServerStyleSheet()
        }
        return null
    })

    useServerInsertedHTML(() => {
        if (!styledComponentsStyleSheet) return null
        const styles = styledComponentsStyleSheet.getStyleElement()
        styledComponentsStyleSheet.instance.clearTag()
        return <>{styles}</>
    })

    // Always wrap children with StyleSheetManager when server-side styles are available
    // This ensures consistent class name generation between server and client
    if (styledComponentsStyleSheet) {
        return (
            <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
                {children}
            </StyleSheetManager>
        )
    }

    return <>{children}</>
}
