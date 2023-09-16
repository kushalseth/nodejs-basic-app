import { render, screen, fireEvent } from '@testing-library/react';
import Header from './index';

describe('Header', () => {
    const mockOnSearch = jest.fn();

    beforeEach(() => {
        render(<Header onSearch={mockOnSearch} />);
    });

    test('renders header title', () => {
        const titleElement = screen.getByText('Room planner');
        expect(titleElement).toBeInTheDocument();
    });

    test('renders header subtitle', () => {
        const subtitleElement = screen.getByText('Rooms');
        expect(subtitleElement).toBeInTheDocument();
    });

    test('calls onSearch with the search value', () => {
        const searchInput = screen.getByTestId('search');
        fireEvent.change(searchInput, { target: { value: 'room' } });
        fireEvent.keyPress(searchInput, { key: 'Enter', code: 13 });

        expect(mockOnSearch).toHaveBeenCalledWith('room');
    });
});
