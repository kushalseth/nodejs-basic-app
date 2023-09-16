import { act, render, screen } from '@testing-library/react';
const axios = require('axios');
import MainBody from './index';
import { API_DOMAIN } from 'lib/general-config';
import { ENDPOINTS } from 'lib/api';

jest.mock('axios');

describe('MainBody', () => {
    const mockGet = jest.spyOn(axios, 'get');
    const mockDelete = jest.spyOn(axios, 'delete');
    const mockPatch = jest.spyOn(axios, 'patch');

    afterEach(() => {
        jest.clearAllMocks();
    });
    test('renders error state', async () => {
        const errorMessage = 'Error fetching data';
        mockGet.mockRejectedValueOnce(new Error(errorMessage));
        render(<MainBody searchValue="" />);
        const errorElement = await screen.findByText(`Error: ${errorMessage}`);
        expect(errorElement).toBeInTheDocument();
    });

    test('renders no items message', async () => {
        mockGet.mockResolvedValueOnce({});

        render(<MainBody searchValue="" />);
        const noItemsElement = await screen.findByText('No items to display');
        expect(noItemsElement).toBeInTheDocument();
    });

    test('renders rooms', async () => {
        const mockItems = [
            {
                _id: '1',
                title: 'Room 1',
                description: 'Room description 1',
                desks: 3,
                imageURL: 'image1.jpg',
                isBooked: false,
            },
            {
                _id: '2',
                title: 'Room 2',
                description: 'Room description 2',
                desks: 2,
                imageURL: 'image2.jpg',
                isBooked: true,
            },
        ];
        mockGet.mockResolvedValueOnce({ data: { data: { items: mockItems } } });

        render(<MainBody searchValue="" />);
        const room1Element = await screen.findByText('Room 1');
        const room2Element = await screen.findByText('Room 2');

        expect(room1Element).toBeInTheDocument();
        expect(room2Element).toBeInTheDocument();
    });

    test('calls onStatusChange when status button is clicked', async () => {
        const mockItems = [
            {
                _id: '1',
                title: 'Room 1',
                description: 'Room description 1',
                desks: 0,
                imageURL: 'image1.jpg',
                isBooked: false,
            },
        ];
        mockGet.mockResolvedValueOnce({ data: { data: { items: mockItems } } });

        render(<MainBody searchValue="" />);
        const statusButton = await screen.findByText('book');
        axios.patch.mockResolvedValueOnce();

        statusButton.click();

        expect(mockPatch).toHaveBeenCalledWith(API_DOMAIN + ENDPOINTS.PATCH.updateStatus("1"));
        expect(mockGet).toHaveBeenCalledTimes(1);
    });
});
