
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './index';

describe('Card', () => {
    const mockOnDelete = jest.fn();
    const mockOnStatusChange = jest.fn();

    beforeEach(() => {
        render(
            <Card
                _id="1"
                title="Test Card"
                description="Test Description"
                imageURL="test-image.jpg"
                desks={0}
                isBooked={false}
                onDelete={mockOnDelete}
                onStatusChange={mockOnStatusChange}
            />
        );
    });

    test('renders card title', () => {
        const descriptionElement = screen.getByText('Test Card');
        expect(descriptionElement).toBeInTheDocument();
    });

    test('renders card description', () => {
        const descriptionElement = screen.getByText('Test Description');
        expect(descriptionElement).toBeInTheDocument();
    });

    test('calls onDelete when delete button is clicked', () => {
        const deleteButton = screen.getByText('delete');
        fireEvent.click(deleteButton);

        expect(mockOnDelete).toHaveBeenCalled();
    });

    test('calls onStatusChange when booking button is clicked', () => {
        const bookingButton = screen.getByText('book');
        fireEvent.click(bookingButton);

        expect(mockOnStatusChange).toHaveBeenCalled();
    });
});
