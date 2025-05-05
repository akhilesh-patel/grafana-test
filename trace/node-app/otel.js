// otel.js
const { NodeTracerProvider } = require('@opentelemetry/sdk-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { registerInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

// Setup the provider
const provider = new NodeTracerProvider();

// Add the OTLP exporter to send traces to SigNoz
const exporter = new OTLPTraceExporter({
  url: 'http://signoz-otel-collector:4317', // SigNoz Collector OTLP endpoint
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// Register instrumentations
registerInstrumentations({
  tracerProvider: provider,
});

// Start the provider
provider.register();

