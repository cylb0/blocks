/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Level from './Level'
import '@testing-library/jest-dom'
import * as useUnitContextModule from '../contexts/useUnitContext'

jest.mock('../contexts/useUnitContext')

const mockUUC = useUnitContextModule as jest.Mocked<typeof useUnitContextModule>;

describe('Level', () => {
    test('renders a level 0', () => {
        mockUUC.useUnitContext.mockReturnValue(10)
        render(<Level level={0}/>);
        const levelText = screen.getByText(/LEVEL/);
        const levelValue = screen.getByText('0');
        expect(levelText).toBeInTheDocument();
        expect(levelValue).toBeInTheDocument();
    });
})