docker run -d --name ff \
  --network signoz-net \
  -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v $(pwd)/otel-collector-config.yaml:/otel-config.yaml \
  --user 0:0 \
  otel/opentelemetry-collector-contrib:latest \
  --config /otel-config.yaml


chmod +r /var/lib/docker/containers/*/*-json.log
