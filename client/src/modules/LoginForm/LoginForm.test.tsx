import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useStore } from '../../hooks/useStore';

// Мокаємо хук useStore
jest.mock('../../hooks/useStore');
const mockLoginUser = jest.fn();
const mockStore = {
    auth: {
        isAuth: false,
        loginUser: mockLoginUser,
    },
};

// Мокаємо функцію navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

(useStore as jest.Mock).mockReturnValue({ store: mockStore });

describe('LoginForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('рендерить форму входу', () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('відображає помилку при відсутньому номері телефону', async () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Log in'));
        await waitFor(() =>
            expect(screen.getByText('Phone number is required')).toBeInTheDocument()
        );
    });

    test('викликає функцію loginUser з вірними даними', async () => {
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Phone Number...'), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByPlaceholderText('Password...'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Log in'));

        await waitFor(() => {
            expect(mockLoginUser).toHaveBeenCalledWith('1234567890', 'password123');
        });
    });

    test('перенаправляє після успішного входу', () => {
        mockStore.auth.isAuth = true;
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
});
