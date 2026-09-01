# github-lab

Repositório de laboratórios práticos para aprender Git e GitHub de forma profissional: branches, pull requests, GitHub Actions (CI) e proteção de branch via Rulesets. Não é um projeto de produção — o código (`sum`/`subtract`) é só pretexto para exercitar o fluxo.

## Stack e comandos

- Node.js 22, ESM (`"type": "module"` no `package.json`).
- `npm run lint` — ESLint (flat config em `eslint.config.js`).
- `npm test` — Vitest (`vitest run`).
- `npm run build` — `node scripts/build.js`, copia `src/calculator.js` para `dist/` (artefato, gitignored).
- `node_modules/` e `dist/` estão no `.gitignore` — nunca commitar.

## Fluxo de trabalho obrigatório

- **Nunca commitar direto na `main`.** Toda mudança entra por branch + Pull Request.
- Merge sempre por **Squash and merge** (é a única opção liberada pelo Ruleset).
- **Antes de mesclar um PR, confirmar com o usuário primeiro** — mesmo que o roteiro do lab diga "faça squash and merge" de forma genérica, isso não é autorização automática para o Claude executar o merge sozinho. (Combinado em 2026-08-31, depois de um merge feito sem essa confirmação.)
- Revisar `git status`/`git diff --staged` antes de todo commit.

## Proteção da `main` (Ruleset "Protect main")

Configurado em 2026-08-31 (LAB 9), ID `21951609`, `Active`, sem bypass. Regras confirmadas via `gh ruleset view`:

- `deletion` — bloqueia apagar a `main`.
- `non_fast_forward` — bloqueia force push.
- `pull_request` — exige PR, `allowed_merge_methods: [squash]`, `required_approving_review_count: 0`.
- `required_status_checks` — exige `lint`, `tests`, `build` verdes, `strict_required_status_checks_policy: true` (branch precisa estar atualizada com a `main` antes de mesclar).

**Gap conhecido:** falta a regra `required_linear_history` ("Require linear history") pedida na tabela original do LAB 9. Não bloqueou nenhum teste até agora porque a exigência de PR já cobre o caso, mas ainda não foi adicionada — pendente, se o usuário quiser fechar esse gap.

`gh ruleset` (CLI) só tem `list`/`view`/`check` — leitura. Criar/editar ruleset por linha de comando exige `gh api` contra `/repos/{owner}/{repo}/rulesets` (não há subcomando de alto nível).

## CI (`.github/workflows/ci.yml`)

Três jobs independentes, cada um `npm ci` + um comando: `lint`, `tests` (`npm test`), `build`. Dispara em `pull_request` e `push` para `main`. Os nomes dos jobs (`lint`/`tests`/`build`) são os que aparecem como required checks no Ruleset — não são nomes mágicos do GitHub, são escolha do projeto.

## Progresso dos labs

| Lab | Tema | Status |
|---|---|---|
| (sem número) | Branch `feature/calculator`, `sum(a,b)`, primeiro PR | ✅ (PR #2, merged) |
| 6 | Testes locais com Vitest | ✅ |
| 7 | Primeiro workflow de CI (job único `tests`) | ✅ |
| 8 | Lint/tests/build como checks separados | ✅ |
| 9 | Ruleset `Protect main` criado e ativo (configurado pelo usuário na UI) | ✅ |
| 10 | Atacar a proteção: push direto rejeitado, PR pelo caminho certo (`docs/test-protection`) | ✅ (PR #3, merged) |
| 11 | Falhar um required check e corrigir no mesmo PR (`subtract` errado → corrigido) | ✅ (PR #4, merged) |
| 12 | Sincronizar branches: `fetch` vs `pull`, `origin/main` desatualizado, dois PRs simultâneos + strict checks | 🔶 em andamento — teoria explicada ao usuário, prática (fetch/log/pull ao vivo + experimento dos 2 PRs) ainda pendente |

PR #1 (`feature/add-about`, "docs: add about page") era de outro projeto/experimento anterior — foi fechado pelo usuário via UI em 2026-08-31, sem merge.

## Gotchas aprendidos

- **ESLint flat config não vem com globals de Node por padrão.** O `eslint.config.js` do roteiro original não declarava `console`, `process` etc., causando `no-undef` em `scripts/build.js`. Corrigido adicionando `globals: { console: "readonly" }` em `languageOptions`.
- **`origin/main` é só um cache local**, não a `main` real do GitHub — só atualiza com `git fetch`/`git pull`. Depois de merges feitos direto pela UI do GitHub, o repo local fica "atrasado" até alguém rodar fetch/pull.
- Merges feitos pela **UI do GitHub** (pelo usuário) não atualizam automaticamente o clone local — sempre conferir com `git fetch` antes de assumir que o estado local bate com o remoto.
