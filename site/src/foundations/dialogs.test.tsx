// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'
import { act, cleanup, render, screen } from '@testing-library/react'
import { ConfirmDialogProvider, Modal, useConfirm } from 'achery-ui'
import { useEffect } from 'react'

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
