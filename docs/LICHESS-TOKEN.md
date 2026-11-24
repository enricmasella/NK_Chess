# Token de Lichess para el Opening Explorer

Desde mediados de 2026 el Opening Explorer (`explorer.lichess.org`) devuelve **401** sin autenticación.
No es un bloqueo de red ni de CORS: exige un token personal. Con el token, `npm run theory:check`
recupera la frecuencia de jugadas de maestros y `npm run theory:ping` comprueba que funciona.

## Crear el token (2 minutos)

1. Entra en <https://lichess.org/account/oauth/token> con tu cuenta (si no tienes, se crea gratis).
2. Pulsa **Create a new personal access token** y ponle un nombre, por ejemplo `NK_Chess`.
3. **No marques ningún scope**: la lectura del explorer solo necesita un token válido, no permisos.
   Así, si el token se filtra, no puede hacer nada en tu cuenta.
4. Copia el token en el momento: empieza por `lip_` y no se vuelve a mostrar.

## Dejarlo listo en el proyecto

```bash
cp .env.example .env.local
# edita .env.local y deja:
# LICHESS_TOKEN=lip_tu_token_aqui
npm run theory:ping
```

`theory:ping` consulta la posición inicial y responde con el número de partidas de maestros. Si el
token no vale, sale con `HTTP 401` y un mensaje claro.

Después:

```bash
npm run theory:check            # frecuencias por capítulo, con caché en .tmp/explorer.json
npm run theory:check -- --refresh   # ignora la caché y vuelve a consultar todo
```

## Qué se desbloquea

| Comando | Sin token | Con token |
| --- | --- | --- |
| `npm run theory:triage` (chessdb.cn) | funciona | funciona |
| `npm run theory:ping` | error explicado | partidas de la posición inicial |
| `npm run theory:check` | se detiene | frecuencia de maestros por capítulo |
| Partidas de referencia | solo las citadas en fuentes | se pueden añadir planillas reales |

## Seguridad

- `.env.local` está ignorado por `.gitignore` (`*.local`). No lo subas ni lo pegues en un chat.
- El token es de solo lectura si no marcas scopes. Puedes revocarlo en la misma página cuando quieras.
- No se ha guardado ningún token en el repositorio: `.env.example` solo contiene el nombre de la
  variable.

## Si algo falla

- **401**: token mal copiado, caducado o revocado. Genera otro y repite `theory:ping`.
- **429**: demasiadas peticiones. `theory:check` reintenta con espera; espacia las ejecuciones.
- **404**: posición sin datos de maestros. El script la cuenta como «sin datos», no como error.
