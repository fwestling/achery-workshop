// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ConfirmDialogProvider, Modal, useConfirm } from 'achery-ui'
import { useEffect, useState } from 'react'

afterEach(cleanup)

describe('Modal', () => {
  it('is a dialog by default, and an alertdialog when asked', () => {
    const { rerender } = render(<Modal open onOpenChange={() => {}} title="Settings">Body</Modal>)
    expect(screen.getByRole('dialog', { name: 'Settings' })).toBeTruthy()
    rerender(<Modal open onOpenChange={() => {}} title="Settings" role="alertdialog">Body</Modal>)
    expect(screen.getByRole('alertdialog', { name: 'Settings' })).toBeTruthy()
  })

  it('fills the window at size full', () => {
    render(<Modal open onOpenChange={() => {}} title="Photo" size="full">Image</Modal>)
    expect(screen.getByRole('dialog', { name: 'Photo' }).className).toMatch(/size_full/)
  })
})

describe('focus after closing', () => {
  it('goes back to what opened a controlled Modal (one with no trigger)', async () => {
    const Opener = () => {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)}>Open</button>
          {/* Unmounted on close, as apps often do */}
          {open && <Modal open onOpenChange={setOpen} title="Viewer">Body</Modal>}
        </>
      )
    }
    render(<Opener />)
    const button = screen.getByRole('button', { name: 'Open' })
    button.focus()
    fireEvent.click(button)
    await waitFor(() => expect(screen.getByRole('dialog', { name: 'Viewer' }).contains(document.activeElement)).toBe(true))
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(document.activeElement).toBe(button))
  })

  it('goes back to what asked useConfirm', async () => {
    const Ask = () => {
      const confirm = useConfirm()
      return <button onClick={() => void confirm({ title: 'Sign out?', message: 'Your photos stay.' })}>Sign out</button>
    }
    render(<ConfirmDialogProvider><Ask /></ConfirmDialogProvider>)
    const button = screen.getByRole('button', { name: 'Sign out' })
    button.focus()
    fireEvent.click(button)
    const dialog = await screen.findByRole('alertdialog', { name: 'Sign out?' })
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    await waitFor(() => expect(dialog.isConnected).toBe(false))
    await waitFor(() => expect(document.activeElement).toBe(button))
  })
})

describe('useConfirm', () => {
  it('asks in an alertdialog described by its message', async () => {
    const Ask = () => {
      const confirm = useConfirm()
      useEffect(() => {
        void confirm({ title: 'Delete 3 photos?', message: 'This can’t be undone.', destructive: true })
      }, [confirm])
      return null
    }
    await act(async () => {
      render(<ConfirmDialogProvider><Ask /></ConfirmDialogProvider>)
    })
    const dialog = screen.getByRole('alertdialog', { name: 'Delete 3 photos?' })
    const describedBy = dialog.getAttribute('aria-describedby')
    expect(describedBy && document.getElementById(describedBy)?.textContent).toBe('This can’t be undone.')
  })
})
