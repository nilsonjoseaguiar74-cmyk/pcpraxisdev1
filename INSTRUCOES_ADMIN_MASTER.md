# ⚠️ INSTRUÇÕES - Criar Administrador

## Como Criar um Administrador

Siga estes passos para criar sua conta de administrador:

### Passo 1: Criar Sua Conta

1. Acesse: `/auth` no seu site
2. Clique na aba **"Sign Up"** (Registrieren / Criar Conta)
3. Preencha com **SEU email e senha**:
   - **Nome Completo**: Seu nome
   - **Email**: seu-email@exemplo.com
   - **Senha**: sua-senha-segura
4. Clique em **"Sign Up"**
5. A conta será criada imediatamente (confirmação de email está desabilitada)

### Passo 2: Tornar-se Admin

Após criar a conta, execute este comando SQL no banco de dados:

1. **Acesse o Backend**:
   - No projeto Lovable, clique em "Cloud" ou "Backend"
   - Vá para **Database → SQL Editor**

2. **Execute este comando** (substitua o email pelo que você usou no cadastro):

```sql
-- Tornar usuário admin automaticamente
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM profiles
WHERE email = 'seu-email@exemplo.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

**Exemplo prático**:
```sql
-- Se você se cadastrou com: admin@pcpraxis.com
INSERT INTO user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM profiles
WHERE email = 'admin@pcpraxis.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

### Passo 3: Fazer Login

1. Faça logout (se ainda estiver logado)
2. Acesse: `/auth`
3. Na aba **"Sign In"** (Anmelden / Login):
   - **Email**: o email que você cadastrou
   - **Senha**: a senha que você definiu
4. Após o login, você verá o botão **"Admin Panel"** no menu
5. Clique para acessar o painel administrativo em `/sistema`

---

## Verificar se é Admin

Para confirmar que você é admin, execute:

```sql
SELECT 
  p.email,
  p.full_name,
  ur.role
FROM profiles p
LEFT JOIN user_roles ur ON p.id = ur.user_id
WHERE p.email = 'seu-email@exemplo.com';
```

Deve retornar:
- **email**: seu email
- **full_name**: seu nome
- **role**: admin

---

## Problemas Comuns

### "Não vejo o botão Admin Panel"
- Verifique se executou o SQL para adicionar a role de admin
- Faça logout e login novamente
- Limpe o cache do navegador

### "Erro ao executar SQL"
- Certifique-se de que criou a conta primeiro via `/auth`
- Verifique se o email no SQL está correto (o mesmo que usou no cadastro)

### "Não consigo fazer login"
- Verifique se o email está correto
- Verifique se a senha está correta
- Tente criar uma nova conta se necessário

### "User already registered"
- Se você já criou a conta mas esqueceu a senha, você pode:
  1. Criar uma nova conta com outro email, OU
  2. Usar a função de reset de senha (se implementada), OU
  3. Excluir o usuário antigo do banco e criar novamente

---

## Criar Outros Admins

Depois de configurar seu primeiro admin, você pode criar outros admins seguindo o mesmo processo:
1. Peça para a pessoa criar conta via `/auth`
2. Execute o SQL acima com o email dela
3. Ela faz logout e login novamente

---

## Segurança

- ✅ Use senhas fortes para contas admin
- ✅ Não compartilhe credenciais de admin
- ✅ Mantenha o acesso ao SQL Editor restrito
- ✅ Considere implementar autenticação de dois fatores no futuro
