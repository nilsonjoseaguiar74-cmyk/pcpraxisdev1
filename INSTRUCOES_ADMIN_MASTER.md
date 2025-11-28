# ⚠️ INSTRUÇÕES IMPORTANTES - Admin Master

## Primeiro Acesso do Administrador

Para ativar o admin master, siga **EXATAMENTE** estes passos:

### Passo 1: Criar a Conta

1. Acesse: `https://seudominio.com/auth`
2. Clique na aba **"Sign Up"** (Registrieren / Criar Conta)
3. Preencha:
   - **Nome Completo**: Admin PC Praxis (ou seu nome)
   - **Email**: `f.rodrigoalves12@gmail.com`
   - **Senha**: `139702`
4. Clique em **"Sign Up"** (Registrieren / Criar Conta)
5. A conta será criada automaticamente (email confirmation está desabilitado)

### Passo 2: Tornar Admin

Após criar a conta, você precisa executar um comando SQL no banco de dados para se tornar administrador:

1. **Acesse o Backend**:
   - Clique no botão "Cloud" ou "Backend" no projeto Lovable
   - Vá para **Database → SQL Editor**

2. **Execute este comando**:
```sql
-- Buscar o ID do usuário
SELECT id FROM profiles WHERE email = 'f.rodrigoalves12@gmail.com';

-- COPIE O ID RETORNADO e substitua abaixo:
INSERT INTO user_roles (user_id, role) 
VALUES ('COLE_O_ID_AQUI', 'admin');
```

**Exemplo prático**:
```sql
-- Se o SELECT retornou: 123e4567-e89b-12d3-a456-426614174000
-- Execute:
INSERT INTO user_roles (user_id, role) 
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'admin');
```

### Passo 3: Fazer Login

1. Faça logout (se ainda estiver logado)
2. Acesse: `https://seudominio.com/auth`
3. Na aba **"Sign In"** (Anmelden / Login):
   - **Email**: `f.rodrigoalves12@gmail.com`
   - **Senha**: `139702`
4. Após o login, você verá o botão **"Admin Panel"** no menu
5. Clique para acessar o painel administrativo

---

## Alternativa: Executar SQL Direto

Se preferir fazer tudo de uma vez, pode executar este SQL após criar a conta via signup:

```sql
-- Tornar o usuário admin (execute DEPOIS de criar a conta em /auth)
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM profiles
WHERE email = 'f.rodrigoalves12@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

Este comando busca automaticamente o ID do usuário pelo email e insere a role de admin.

---

## Verificar se está Admin

Para confirmar que você é admin, execute:

```sql
SELECT 
  p.email,
  p.full_name,
  ur.role
FROM profiles p
LEFT JOIN user_roles ur ON p.id = ur.user_id
WHERE p.email = 'f.rodrigoalves12@gmail.com';
```

Deve retornar:
- **email**: f.rodrigoalves12@gmail.com
- **full_name**: seu nome
- **role**: admin

---

## Problemas Comuns

### "Não vejo o botão Admin Panel"
- Verifique se executou o SQL para adicionar a role de admin
- Faça logout e login novamente
- Verifique se o email está correto

### "Erro ao executar SQL"
- Certifique-se de que criou a conta primeiro via `/auth`
- Verifique se copiou o ID corretamente (deve ter formato UUID)

### "Não consigo fazer login"
- Verifique se o email está correto: `f.rodrigoalves12@gmail.com`
- Verifique se a senha está correta: `139702`
- Tente resetar a senha se necessário

---

## Após Configurar

Depois de configurar o admin master, você pode:
- ✅ Acessar o painel admin em `/sistema`
- ✅ Gerenciar produtos
- ✅ Ver e processar pedidos
- ✅ Criar outros admins usando o mesmo processo

---

**IMPORTANTE**: Guarde estas credenciais em local seguro e considere alterar a senha após o primeiro acesso.
