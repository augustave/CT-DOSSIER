import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('PRD v1.0.2: Zero-Click & Fat Trim', () => {
    beforeEach(() => {
        // Reset hash
        window.location.hash = '';
    });

    it('defaults to Module 02 (Recruitment Triad) on cold load', () => {
        render(<App />);
        expect(screen.getByText(/THE RECRUITMENT TRIAD/i)).toBeInTheDocument();
        // Check for specific Module 02 text
        expect(screen.getByText(/Who are three people you would recruit/i)).toBeInTheDocument();
    });

    it('shows Header buttons: Index and Initiate Inquiry', () => {
        render(<App />);
        expect(screen.getByText(/INDEX \(00\)/i)).toBeInTheDocument();
        expect(screen.getByText(/INITIATE INQUIRY/i)).toBeInTheDocument();
    });

    it('does NOT show Footer END section', () => {
        render(<App />);
        // "END" was the large text in the footer. It should be gone.
        // We look for the specific footer text "The list is the narrative" which was also removed/hidden.
        const endText = screen.queryByText(/^END$/i);
        expect(endText).not.toBeInTheDocument();
    });

    it('opens Manifest Overlay when INDEX is clicked', async () => {
        render(<App />);
        const indexBtn = screen.getByText(/INDEX \(00\)/i);
        fireEvent.click(indexBtn);
        // Overlay header check
        await waitFor(() => {
             const overlayHeader = screen.getAllByText(/^INDEX$/i);
             expect(overlayHeader[0]).toBeVisible();
        });
    });
});
