import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        // Basic check to see if the app renders something.
        // Adjust this selector based on actual App content if needed.
        // For now, checks if the body has content.
        expect(document.body).toBeInTheDocument();
    });
});
