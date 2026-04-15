import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('CT Dossier: recruiter-facing layout and IA', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = () => {};
    window.location.hash = '';
  });

  it('defaults to module 01 when no hash is present', async () => {
    render(<App />);

    await waitFor(() => {
      expect(window.location.hash).toBe('#module-01');
    });
  });

  it('shows Header/Footer CTA as REQUEST CONVERSATION', () => {
    render(<App />);
    const ctas = screen.getAllByText(/REQUEST CONVERSATION/i);
    expect(ctas.length).toBeGreaterThanOrEqual(1);
  });

  it('shows Footer with correct text', () => {
    render(<App />);
    expect(screen.getAllByText(/CT DOSSIER/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/v1\.2\.0 \+ NO API/i)).toBeInTheDocument();
  });

  it('shows a target roles block near the top of the page', () => {
    render(<App />);
    const rolesHeading = screen.getByText(/Target Roles/i);
    const rolesSection = rolesHeading.closest('section') as HTMLElement;
    expect(rolesSection).not.toBeNull();
    expect(within(rolesSection).getByText(/^Creative Technologist$/i)).toBeInTheDocument();
    expect(within(rolesSection).getByText(/^Visual Designer, Defense$/i)).toBeInTheDocument();
  });

  it('does NOT show Module 06 / Evidence Locker', () => {
    render(<App />);
    const evidenceLink = screen.queryByText(/EVIDENCE LOCKER/i);
    expect(evidenceLink).not.toBeInTheDocument();
  });

  it('keeps manifest ordering with module 02 before 01', async () => {
    render(<App />);
    fireEvent.click(screen.getByText(/INDEX \(00\)/i));

    const overlayHeading = await screen.findByRole('heading', { name: /^INDEX$/i });
    const overlayContainer = overlayHeading.closest('.fixed') as HTMLElement;
    expect(overlayContainer).not.toBeNull();

    const manifestText = overlayContainer.textContent ?? '';
    expect(manifestText.indexOf('CREATIVE TECHNOLOGIST')).toBeLessThan(manifestText.indexOf('ROLE FIT'));
  });

  it('opens the inquiry dialog, focuses the close button, and closes on Escape', async () => {
    render(<App />);
    fireEvent.click(screen.getAllByText(/REQUEST CONVERSATION/i)[0]);

    const dialog = await screen.findByRole('dialog', { name: /Inquiry/i });
    const closeButton = within(dialog).getByRole('button', { name: /Close inquiry panel/i });
    const emailButton = within(dialog).getByRole('button', { name: /EMAIL DISABLED/i });

    await waitFor(() => {
      expect(closeButton).toHaveFocus();
    });
    expect(emailButton).toBeDisabled();

    fireEvent.keyDown(dialog, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /Inquiry/i })).not.toBeInTheDocument();
    });
  });
});
