### Prosta apka demo pokazująca prace z koleją i powtarzalnymi jobami (via cron) w bull
(https://github.com/OptimalBits/bull)

#### Co potrzebne
- redis(lokalnie), node, npm

#### Start

0. Sprawdź czy lokalnie działa redis
1. Instalujemy apke
```
npm i
```
2. w 2 osobnych terminalach odpalamy schedulery
```
node scheduler.js (job co 5sec)
```

```
node scheduler2.js (job co 10sec)
```

3. odpalamy dashboard w nowym terminalu (http://localhost:3000)
```
node dashboard.js
```

4. Done, podziwiamy nasze kolejki ;)