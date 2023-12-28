# Shop service

## Getting start

## Development

```bash
npm run start:debug
```

## Docker

```bash
docker build -t docker.iblabs.ir/obc/shop:latest .
docker run --name shop -p 5000:5000 docker.iblabs.ir/obc/shop:latest
```

## Testing

### Unit

```bash
npm run test
```

### End to End

```bash
npm run test:e2e
```