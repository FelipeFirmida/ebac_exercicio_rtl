import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Post from '.';
import PostComment from '.';
import userEvent from '@testing-library/user-event';

describe('Teste para o componente PostComment', () => {
    it('Deve renderizar o componente corretamente', () => {
        render(<PostComment/>);
        expect(screen.getByText('Comentar')).toBeInTheDocument();
    });

    test('Deve checar se os comentários foram adicionados corretamente', async () => {
        render(<PostComment />);
        const textarea = screen.getByRole('textbox');
        const button = screen.getByTestId('btn-comentar');
        userEvent.type(textarea, 'vrum vrum')
        userEvent.click(button);
        userEvent.clear(textarea);
        userEvent.type(textarea, 'Legal!')
        userEvent.click(button);

        const commentSection = screen.getByTestId('comment-section');

        await waitFor(() => {
            expect(commentSection).toHaveTextContent('vrum vrum')         
        });

        await waitFor(() => {
            expect(commentSection).toHaveTextContent('Legal!')          
        });
    });
});