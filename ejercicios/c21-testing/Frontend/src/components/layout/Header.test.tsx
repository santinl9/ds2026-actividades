import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('/Mejai27s_Soulstealer_old (1).png', () => ({ default: 'logo.png' }));

import Header from './Header';
import { AuthContext } from '../context/AuthContext';
import type { Usuario, Rol } from '../../types/SessionType';

function renderHeader(usuario: Usuario | null) {
    const auth = {
        usuario,
        cargando: false,
        estaAutenticado: usuario !== null,
        tieneRol: (rol: Rol) => usuario?.rol === rol,
        login: vi.fn(),
        logout: vi.fn(),
    };
    return render(
        <MemoryRouter>
            <AuthContext.Provider value={auth}>
                <Header />
            </AuthContext.Provider>
        </MemoryRouter>,
    );
}

describe('Header según el rol', () => {
    it('sin sesión: muestra "Ingresar" y NO ve "Solo Admin"', () => {
        renderHeader(null);
        expect(screen.getByText('Ingresar')).toBeInTheDocument();
        expect(screen.queryByText('Solo Admin')).not.toBeInTheDocument();
    });

    it('CLIENTE: saluda por nombre y NO ve "Solo Admin"', () => {
        renderHeader({
            id: 2,
            email: 'cliente@libreria.test',
            nombre: 'Cliente',
            rol: 'CLIENTE',
        });
        expect(screen.getByText(/Hola, Cliente/i)).toBeInTheDocument();
        expect(screen.queryByText('Solo Admin')).not.toBeInTheDocument();
    });

    it('ADMIN: saluda por nombre y ve el link "Solo Admin"', () => {
        renderHeader({
            id: 1,
            email: 'admin@libreria.test',
            nombre: 'Admin',
            rol: 'ADMIN',
        });
        expect(screen.getByText(/Hola, Admin/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Solo Admin' })).toBeInTheDocument();
    });
});
