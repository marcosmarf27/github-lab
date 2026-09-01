# Contribuindo

Guia rápido para trabalhar neste repositório.

## Preparar o ambiente

```
git clone https://github.com/marcosmarf27/github-lab.git
cd github-lab
npm install
```

Requer Node.js 22 (mesma versão usada no CI).

## Nomeação de branches

| Tipo | Exemplo |
|---|---|
| `feature/*` | `feature/user-login` |
| `fix/*` | `fix/null-document` |
| `docs/*` | `docs/api-guide` |
| `refactor/*` | `refactor/process-parser` |
| `chore/*` | `chore/update-tooling` |

## Mensagens de commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/) por legibilidade — não é uma exigência do GitHub, mas ajuda releases e automações futuras.

```
feat: add user login
fix: handle missing document
docs: explain deployment
test: cover empty response
refactor: simplify parser
ci: add security scan
chore: update dependencies
```

Um PR deve representar uma única mudança lógica. Evite misturar feature, refatoração ampla, atualização de dependências e formatação num único PR.

## Rodar lint, testes e build localmente

```
npm run lint
npm test
npm run build
```

Os três rodam também no CI (`lint`, `tests`, `build`) e são checks obrigatórios para mesclar na `main`.

## Abrir um Pull Request

1. Crie a branch a partir da `main` atualizada (`git switch main && git pull && git switch -c tipo/nome`).
2. Commit e push.
3. Abra o PR contra `main` — o corpo já vem preenchido pelo [template](.github/PULL_REQUEST_TEMPLATE.md).
4. Aguarde os checks (`lint`, `tests`, `build`) passarem.

## Estratégia de merge

Apenas **Squash and merge** é permitido — é a única opção liberada pelo Ruleset da `main`. Push direto na `main` e force push são bloqueados.
