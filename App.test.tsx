import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('App Zero-Click & Fat Trim', () => {
    beforeEach(() => {
        // Reset hash
        window.location.hash = '';
    });

    it('defaults to Module 02 (Recruitment Triad) on cold load', () => {
        render(<App />);
        // Module 02 Title
        expect(screen.getByText(/THE RECRUITMENT TRIAD/i)).toBeInTheDocument();
        // Module 02 Prompt
        expect(screen.getByText(/Who are three people you would recruit/i)).toBeInTheDocument();
    });

    it('shows Index button in header', () => {
        render(<App />);
        expect(screen.getByText(/INDEX \(00\)/i)).toBeInTheDocument();
    });

    it('opens Manifest Overlay when INDEX is clicked', async () => {
        render(<App />);
        
        // Manifest title should be hidden or not in document initially depending on implementation
        // Our Overlay implementation uses opacity-0 but renders. 
        // Let's check for the button click effect.
        
        const indexBtn = screen.getByText(/INDEX \(00\)/i);
        fireEvent.click(indexBtn);

        // Expect Overlay Content to be visible
        // "NAVIGATION INDEX" is the promptText for Module 00, but Overlay render logic might be custom.
        // ManifestOverlay renders "INDEX" as a big h2.
        await waitFor(() => {
             const overlayHeader = screen.getAllByText(/^INDEX$/i); // exact match for h2?
             // Actually ManifestOverlay has <h2 ...>INDEX</h2>
             expect(overlayHeader[0]).toBeVisible(); 
             // Note: toBeVisible check in jsdom can be tricky with opacity, but usually checking for class or simple presence.
        });
    });
});
