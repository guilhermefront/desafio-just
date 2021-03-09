import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from 'App';
import { renderRedux } from 'test-util';

test('if products are shown correctly', async () => {
  renderRedux(<App />, {
    initialState: {
      products: {
        fetchProductsState: 'fulfilled',
        productsList: [
          {
            id: 133453126,
            title:
              'Smartphone Motorola Moto G6 Dual Chip Android Oreo - 8.0 Tela 5.7" Octa-Core 1.8 GHz 32GB 4G Câmera 12 + 5MP (Dual Traseira) - Índigo',
            price: 1299,
            picture:
              'https://imagens.canaltech.com.br/produto/buscape/o292298908.jpg',
            description:
              'Misturando inovação, modernidade e qualidade, o novo moto g6 chegou para deixar tudo o que você precisa na palma da sua mão, desbravando um mundo de novidades e experiências extremamente inesquecíveis. Com processador octa-core de 1,8 GHz, 3GB de RAM(1), bateria que dura o dia todo(2) e carregamento TurboPower™, você executa suas tarefas sem se preocupar(3). Além disso, sua deslumbrante Tela Max Vision permite com que você veja sua vida em tela cheia, já que pode assistir a tudo em um incrível espaço Full HD+ de 5,7 polegadas. Pensa que acabou? Então prepare-se: este novo integrante da Família moto g6 possui design com acabamento traseiro em vidro 3D que se encaixa perfeitamente em suas mãos.E não para por aí! Agora você pode registrar todos os seus momentos em fotos incríveis, já que o moto g6 vem com câmera traseira dupla e câmera frontal de 8MP com flash LED. Ah, e ele tem Android Puro 8.0 Oreo, a última versão do sistema operacional mais utilizado em todo o mundo. moto g6: impressionante em todos os ângulos.',
            memory: '32GB',
            brand: 'Motorola',
            chipType: 'Nano Chip',
            quantity: 2,
          },
        ],
      },
    },
  });
  await screen.findByRole('list');
  await screen.findByText('Em estoque');
  await screen.findByText(
    'Smartphone Motorola Moto G6 Dual Chip Android Oreo - 8.0 Tela 5.7" Octa-Core 1.8 GHz 32GB 4G Câmera 12 + 5MP (Dual Traseira) - Índigo'
  );
  await screen.findByText('R$1299');
  userEvent.click(
    screen.getByRole('link', {
      name:
        'Em estoque Smartphone Motorola Moto G6 Dual Chip Android Oreo - 8.0 Tela 5.7" Octa-Core 1.8 GHz 32GB 4G Câmera 12 + 5MP (Dual Traseira) - Índigo R$1299',
    })
  );
  await screen.findByText('Memória');
  await screen.findByText('32GB');
  await screen.findByText('Marca');
  await screen.findByText('Motorola');
  await screen.findByText('Tipo de chip');
  await screen.findByText('Nano Chip');
  await screen.findByText('R$1299');
});
