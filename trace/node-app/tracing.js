const { NodeTracerProvider } = require('@opentelemetry/sdk-node');
const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { registerInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

// Initialize OpenTelemetry Tracer Provider
const provider = new NodeTracerProvider();

// Set up OTLP Trace Exporter to send traces to SigNoz
const exporter = new OTLPTraceExporter({
  url: 'http://signoz-otel-collector:4317',  // SigNoz collector endpoint
});

// Add the exporter to the provider
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

// Register instrumentations (auto-instruments common libraries)
registerInstrumentations({
  tracerProvider: provider,
});

// Register the provider
provider.register();

console.log('OpenTelemetry Tracing Initialized');

