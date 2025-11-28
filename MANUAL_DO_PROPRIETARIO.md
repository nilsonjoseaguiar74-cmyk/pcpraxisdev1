# Manual do Proprietário - PC Praxis

## Índice
1. [Introdução](#introdução)
2. [Acesso ao Sistema](#acesso-ao-sistema)
3. [Gestão de Produtos](#gestão-de-produtos)
4. [Gestão de Pedidos](#gestão-de-pedidos)
5. [Alertas de Estoque](#alertas-de-estoque)
6. [Lógica de Contabilização](#lógica-de-contabilização)

---

## Introdução

Este manual foi criado para auxiliar na gestão do website PC Praxis. O sistema possui funcionalidades completas de e-commerce com gestão de produtos, pedidos e alertas de estoque.

---

## Acesso ao Sistema

### Login de Administrador

1. **URL de acesso**: `https://seudominio.com/sistema`
2. O acesso de administrador é **discreto** e separado do login de clientes
3. Após o primeiro login, você será redirecionado ao painel administrativo

### Criar Conta de Administrador

Para tornar uma conta em administrador, execute o seguinte comando SQL no banco de dados:

```sql
INSERT INTO user_roles (user_id, role) 
VALUES ('[ID_DO_USUARIO]', 'admin');
```

**Como obter o ID do usuário:**
1. Acesse o painel Cloud (backend)
2. Vá em Database → Tables → profiles
3. Encontre o email do usuário e copie o ID

---

## Gestão de Produtos

### Adicionar Produto Manualmente

1. Acesse o painel admin (`/sistema`)
2. Clique na aba **"Produtos"**
3. Clique em **"Novo Produto"**
4. Preencha os campos:
   - **Nome*** (obrigatório): Nome do produto
   - **Número da Peça*** (obrigatório): Código identificador único
   - **Descrição**: Descrição detalhada do produto
   - **Preço (€)*** (obrigatório): Valor em euros
   - **Quantidade*** (obrigatório): Estoque disponível
   - **Categoria**: Tipo do produto (ex: GPU, CPU, RAM, etc.)
   - **URL da Imagem**: Link para imagem do produto
5. Clique em **"Criar Produto"**

### Editar Produto

1. Na lista de produtos, clique no ícone de **lápis** (editar)
2. Modifique os campos desejados
3. Clique em **"Atualizar Produto"**

### Excluir Produto

1. Na lista de produtos, clique no ícone de **lixeira** (excluir)
2. Confirme a exclusão

### Campos Obrigatórios

- ✅ Nome
- ✅ Número da Peça
- ✅ Preço
- ✅ Quantidade

**Importante**: O ID do produto é gerado automaticamente pelo sistema.

---

## Gestão de Pedidos

### Visualizar Pedidos

1. Acesse o painel admin (`/sistema`)
2. Clique na aba **"Pedidos"**
3. Visualize todos os pedidos com as seguintes informações:
   - ID do Pedido
   - Cliente (nome e email)
   - Total do pedido
   - Status
   - Data de criação

### Status de Pedidos

O sistema suporta 4 status:

- 🟡 **Pendente** (pending): Pedido recebido, aguardando processamento
- 🔵 **Em Processamento** (processing): Pedido em preparação
- ✅ **Completo** (completed): Pedido finalizado e entregue
- ❌ **Cancelado** (cancelled): Pedido cancelado

### Alterar Status do Pedido

1. Na lista de pedidos, identifique o pedido
2. Clique em **"Editar"** ou no status atual
3. Selecione o novo status
4. O sistema atualizará automaticamente

---

## Alertas de Estoque

### Sistema de Alertas Automáticos

O sistema monitora automaticamente o estoque e emite alertas quando:

- **Estoque Baixo**: Quantidade ≤ 5 unidades
- **Sem Estoque**: Quantidade = 0 unidades

### Visualizar Alertas

No painel de Produtos, você verá badges coloridos indicando o status:

- 🔴 **Badge Vermelho**: Produto sem estoque (0 unidades)
- 🟡 **Badge Amarelo**: Estoque baixo (≤ 5 unidades)
- 🟢 **Badge Verde**: Estoque normal (> 5 unidades)

### Recomendações

- Monitore diariamente os produtos com estoque baixo
- Configure alertas de reposição quando o estoque atingir 5 unidades
- Mantenha um histórico de vendas para previsão de demanda

---

## Lógica de Contabilização

### Fluxo de Pedido

```
1. Cliente seleciona produtos no Shop
2. Sistema calcula subtotal de cada item (preço × quantidade)
3. Sistema calcula total do pedido (soma de todos subtotais)
4. Cliente finaliza pedido
5. Pedido é criado com status "Pendente"
6. Estoque é reduzido automaticamente (FUTURO)
7. Admin processa pedido e atualiza status
```

### Cálculo de Valores

**Subtotal do Item**:
```
subtotal = preço_unitário × quantidade
```

**Total do Pedido**:
```
total_pedido = Σ (subtotal de todos os itens)
```

### Estrutura de Dados

Cada pedido contém:
- **ID do Pedido**: Identificador único
- **ID do Cliente**: Referência ao usuário
- **Total**: Valor total calculado
- **Status**: Estado atual do pedido
- **Endereço de Envio**: Dados de entrega (JSON)
- **Método de Pagamento**: Forma de pagamento escolhida
- **Notas**: Observações adicionais
- **Data de Criação**: Timestamp de criação
- **Data de Atualização**: Última modificação

### Itens do Pedido

Cada item armazena:
- **ID do Produto**: Referência ao produto
- **Quantidade**: Quantidade comprada
- **Preço Unitário**: Preço no momento da compra
- **Subtotal**: Cálculo (preço × quantidade)

**Importante**: O preço é armazenado no momento da compra para manter histórico, mesmo se o preço do produto mudar posteriormente.

---

## Suporte Técnico

Para suporte técnico ou dúvidas adicionais:
- **Website**: https://rodrigo.run
- **Desenvolvedor**: rodrigo.run

---

## Multilíngue

O site suporta **Alemão** (padrão) e **Inglês**. Os clientes podem alternar o idioma usando o seletor no navbar.

### Idiomas Disponíveis:
- 🇩🇪 Alemão (DE) - Idioma padrão
- 🇬🇧 Inglês (EN) - Idioma opcional

---

*Última atualização: Novembro 2025*
