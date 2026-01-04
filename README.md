# AI Builder

A comprehensive framework for building, deploying, and managing AI applications with ease. AI Builder provides a modular architecture, extensive API documentation, and production-ready deployment guidelines.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Deployment Guide](#deployment-guide)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Core Capabilities

- **Modular Architecture**: Build scalable AI applications with composable modules
- **Multi-Framework Support**: Seamless integration with TensorFlow, PyTorch, and Hugging Face
- **API Management**: Built-in REST API generation and management
- **Model Registry**: Centralized model versioning and management
- **Auto-Scaling**: Automatic scaling based on demand
- **Real-time Monitoring**: Comprehensive logging, metrics, and performance tracking
- **GPU Support**: Optimized for CPU and GPU workloads
- **Docker Integration**: Out-of-the-box containerization
- **Configuration Management**: YAML-based configuration system
- **Error Handling**: Robust error handling and recovery mechanisms

### Advanced Features

- **Pipeline Orchestration**: Create complex AI workflows with DAG-based pipelines
- **Batch Processing**: Efficient batch processing for large datasets
- **A/B Testing**: Built-in A/B testing framework for model evaluation
- **Custom Metrics**: Define and track custom performance metrics
- **Webhook Support**: Event-driven architecture with webhook notifications
- **Multi-tenancy**: Support for multi-tenant deployments

---

## Project Structure

```
ai-builder/
├── src/
│   ├── core/
│   │   ├── __init__.py
│   │   ├── base.py              # Base classes and interfaces
│   │   ├── config.py            # Configuration management
│   │   └── exceptions.py        # Custom exceptions
│   ├── models/
│   │   ├── __init__.py
│   │   ├── registry.py          # Model registry implementation
│   │   ├── loader.py            # Model loading utilities
│   │   └── validator.py         # Model validation logic
│   ├── api/
│   │   ├── __init__.py
│   │   ├── server.py            # API server setup
│   │   ├── routes.py            # API endpoints
│   │   ├── middleware.py        # Custom middleware
│   │   └── serializers.py       # Request/response serialization
│   ├── pipelines/
│   │   ├── __init__.py
│   │   ├── orchestrator.py      # Pipeline orchestration
│   │   ├── executor.py          # Execution engine
│   │   └── steps.py             # Pipeline step definitions
│   ├── monitoring/
│   │   ├── __init__.py
│   │   ├── logger.py            # Logging configuration
│   │   ├── metrics.py           # Metrics collection
│   │   └── profiler.py          # Performance profiling
│   └── utils/
│       ├── __init__.py
│       ├── helpers.py           # Utility functions
│       └── constants.py         # Project constants
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── config/
│   ├── default.yaml
│   ├── development.yaml
│   ├── staging.yaml
│   └── production.yaml
├── docs/
│   ├── api/
│   ├── guides/
│   └── examples/
├── examples/
│   ├── basic_model.py
│   ├── pipeline_example.py
│   └── api_server.py
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── .dockerignore
├── requirements.txt
├── setup.py
├── pytest.ini
├── .gitignore
└── README.md
```

---

## Installation

### Prerequisites

- Python 3.8 or higher
- pip or conda package manager
- Docker (optional, for containerized deployment)
- CUDA 11.0+ (optional, for GPU support)

### From Source

```bash
# Clone the repository
git clone https://github.com/raj3kk/ai-builder.git
cd ai-builder

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Install in development mode
pip install -e .
```

### Using Docker

```bash
# Build Docker image
docker build -f docker/Dockerfile -t ai-builder:latest .

# Run container
docker run -it --gpus all -v $(pwd):/workspace ai-builder:latest
```

### Using Conda

```bash
# Create conda environment
conda create -n ai-builder python=3.10
conda activate ai-builder

# Install dependencies
pip install -r requirements.txt
```

---

## Usage Guide

### Quick Start

#### 1. Basic Model Loading and Inference

```python
from ai_builder.models import ModelRegistry
from ai_builder.core.config import Config

# Initialize configuration
config = Config.from_file("config/default.yaml")

# Load a model
registry = ModelRegistry(config)
model = registry.load_model("my-model", version="1.0")

# Make predictions
result = model.predict([1.0, 2.0, 3.0])
print(result)
```

#### 2. Creating an API Server

```python
from ai_builder.api import APIServer
from ai_builder.models import ModelRegistry

# Initialize server
server = APIServer(host="0.0.0.0", port=8000)

# Load model registry
registry = ModelRegistry()

# Register endpoints
@server.route("/predict", methods=["POST"])
def predict(request):
    data = request.json
    predictions = registry.get_model("default").predict(data)
    return {"predictions": predictions}

# Start server
server.run()
```

#### 3. Building a Pipeline

```python
from ai_builder.pipelines import Pipeline, PipelineStep

# Define pipeline steps
class DataLoadStep(PipelineStep):
    def execute(self, context):
        context["data"] = load_data()
        return context

class PreprocessStep(PipelineStep):
    def execute(self, context):
        context["processed"] = preprocess(context["data"])
        return context

class InferenceStep(PipelineStep):
    def execute(self, context):
        model = context["model"]
        context["results"] = model.predict(context["processed"])
        return context

# Build pipeline
pipeline = Pipeline(name="inference_pipeline")
pipeline.add_step(DataLoadStep())
pipeline.add_step(PreprocessStep())
pipeline.add_step(InferenceStep())

# Execute pipeline
result = pipeline.execute({"model": my_model})
```

### Configuration

Create a `config.yaml` file:

```yaml
# Model configuration
model:
  registry_path: "./models"
  default_version: "latest"
  cache_enabled: true
  cache_ttl: 3600

# API configuration
api:
  host: "0.0.0.0"
  port: 8000
  workers: 4
  timeout: 30
  cors_enabled: true

# Monitoring configuration
monitoring:
  log_level: "INFO"
  metrics_enabled: true
  profiling: false
  sentry_dsn: null

# Pipeline configuration
pipelines:
  max_workers: 4
  timeout: 300
  retry_attempts: 3

# Database configuration
database:
  engine: "postgresql"
  host: "localhost"
  port: 5432
  name: "ai_builder"
```

### Advanced Usage

#### Custom Metrics

```python
from ai_builder.monitoring import MetricsCollector

metrics = MetricsCollector()

# Record custom metric
metrics.record("inference_latency", latency_ms, tags={"model": "v1"})
metrics.record("model_accuracy", accuracy_score, tags={"dataset": "test"})

# Get metrics summary
summary = metrics.get_summary()
```

#### Batch Processing

```python
from ai_builder.pipelines import BatchProcessor

processor = BatchProcessor(
    batch_size=32,
    num_workers=4,
    timeout=300
)

# Process large dataset
results = processor.process(
    data=large_dataset,
    model=model,
    output_file="results.json"
)
```

#### A/B Testing

```python
from ai_builder.models import ABTester

tester = ABTester(test_id="exp_001", split_ratio=0.5)

# Route requests
model_version = tester.select_variant(user_id)
result = model_version.predict(data)

# Log metrics
tester.log_metric(user_id, "conversion", value)

# Get results
stats = tester.get_statistics()
```

---

## API Documentation

### REST Endpoints

#### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-04T16:17:12Z",
  "version": "1.0.0"
}
```

#### Predict

```http
POST /predict
Content-Type: application/json

{
  "model_name": "my-model",
  "model_version": "1.0",
  "data": [[1.0, 2.0, 3.0]]
}
```

**Response:**
```json
{
  "predictions": [0.95],
  "latency_ms": 45,
  "model_version": "1.0"
}
```

#### Batch Predict

```http
POST /batch-predict
Content-Type: application/json

{
  "model_name": "my-model",
  "data": [
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0]
  ]
}
```

**Response:**
```json
{
  "predictions": [0.95, 0.87],
  "batch_id": "batch_001",
  "processing_time_ms": 120
}
```

#### List Models

```http
GET /models
```

**Response:**
```json
{
  "models": [
    {
      "name": "my-model",
      "versions": ["1.0", "1.1", "2.0"],
      "default_version": "2.0",
      "created_at": "2025-12-01T10:00:00Z"
    }
  ]
}
```

#### Get Model Info

```http
GET /models/{model_name}/{version}
```

**Response:**
```json
{
  "name": "my-model",
  "version": "1.0",
  "framework": "pytorch",
  "input_shape": [1, 3],
  "output_shape": [1, 1],
  "created_at": "2025-12-01T10:00:00Z",
  "metrics": {
    "accuracy": 0.95,
    "f1_score": 0.93
  }
}
```

#### Deploy Model

```http
POST /models/deploy
Content-Type: application/json

{
  "model_name": "my-model",
  "version": "2.0",
  "resources": {
    "cpu": 2,
    "memory_gb": 4,
    "gpu": 1
  }
}
```

**Response:**
```json
{
  "deployment_id": "deploy_001",
  "status": "in_progress",
  "estimated_time_seconds": 60
}
```

### Authentication

All endpoints support Bearer token authentication:

```http
Authorization: Bearer your_token_here
```

### Error Responses

```json
{
  "error": "ModelNotFoundError",
  "message": "Model 'unknown-model' not found",
  "status_code": 404,
  "timestamp": "2026-01-04T16:17:12Z"
}
```

---

## Deployment Guide

### Local Development

```bash
# Set environment
export ENVIRONMENT=development

# Run with hot reload
python -m ai_builder.api.server --reload

# Run tests
pytest tests/ -v

# Check code quality
flake8 src/ --max-line-length=100
black src/ --check
```

### Staging Deployment

#### Using Docker Compose

```bash
# Build images
docker-compose -f docker/docker-compose.yml build

# Start services
docker-compose -f docker/docker-compose.yml up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

#### Configuration for Staging

```bash
# Set environment variables
export ENVIRONMENT=staging
export MODEL_REGISTRY_PATH=/models
export DATABASE_URL=postgresql://user:pass@db:5432/ai_builder
export LOG_LEVEL=INFO
export WORKERS=4
```

### Production Deployment

#### Using Kubernetes

```bash
# Create namespace
kubectl create namespace ai-builder

# Create ConfigMap
kubectl create configmap ai-builder-config --from-file=config/production.yaml -n ai-builder

# Deploy
kubectl apply -f k8s/deployment.yaml -n ai-builder
kubectl apply -f k8s/service.yaml -n ai-builder

# Check status
kubectl get pods -n ai-builder
kubectl describe pod <pod-name> -n ai-builder

# View logs
kubectl logs <pod-name> -n ai-builder
```

#### Sample Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ai-builder-api
  namespace: ai-builder
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ai-builder-api
  template:
    metadata:
      labels:
        app: ai-builder-api
    spec:
      containers:
      - name: api
        image: ai-builder:latest
        ports:
        - containerPort: 8000
        resources:
          requests:
            memory: "4Gi"
            cpu: "2"
          limits:
            memory: "8Gi"
            cpu: "4"
            nvidia.com/gpu: "1"
        env:
        - name: ENVIRONMENT
          value: "production"
        - name: LOG_LEVEL
          value: "INFO"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
```

#### Environment Variables

```bash
# Core Configuration
ENVIRONMENT=production
DEBUG=false
LOG_LEVEL=INFO

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_WORKERS=8
API_TIMEOUT=30

# Model Configuration
MODEL_REGISTRY_PATH=/models
MODEL_CACHE_ENABLED=true
MODEL_CACHE_TTL=3600

# Database Configuration
DATABASE_URL=postgresql://user:password@db-host:5432/ai_builder
DATABASE_POOL_SIZE=20

# Monitoring
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project
METRICS_ENABLED=true

# Security
SECRET_KEY=your-secret-key
API_KEY_SALT=your-salt
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# Resource Limits
MAX_MEMORY_MB=8192
MAX_WORKERS=8
REQUEST_SIZE_LIMIT_MB=100
```

### Health Checks

```bash
# Health check endpoint
curl http://localhost:8000/health

# Load test
ab -n 1000 -c 100 http://localhost:8000/health

# Performance metrics
curl http://localhost:8000/metrics
```

### Monitoring and Logging

```bash
# View application logs
tail -f logs/app.log

# Filter by level
grep "ERROR" logs/app.log

# Monitor performance
python -m ai_builder.monitoring.profiler --duration=300

# Export metrics
curl http://localhost:8000/metrics/export > metrics.json
```

### Backup and Recovery

```bash
# Backup model registry
tar -czf models_backup_$(date +%Y%m%d).tar.gz /models

# Backup database
pg_dump ai_builder > backup_$(date +%Y%m%d).sql

# Restore database
psql ai_builder < backup_20260101.sql
```

### Scaling

#### Horizontal Scaling

```bash
# Increase replicas
kubectl scale deployment ai-builder-api --replicas=5 -n ai-builder

# Auto-scaling based on CPU
kubectl autoscale deployment ai-builder-api --min=3 --max=10 --cpu-percent=80 -n ai-builder
```

#### Vertical Scaling

Update resource requests/limits in Kubernetes deployment YAML and apply changes.

---

## Testing

### Unit Tests

```bash
# Run all unit tests
pytest tests/unit/ -v

# Run specific test file
pytest tests/unit/test_models.py -v

# Run with coverage
pytest tests/unit/ --cov=src --cov-report=html
```

### Integration Tests

```bash
# Run integration tests
pytest tests/integration/ -v

# Run specific test
pytest tests/integration/test_api.py::test_predict -v
```

### Load Testing

```bash
# Using Apache Bench
ab -n 10000 -c 100 http://localhost:8000/health

# Using locust
locust -f tests/load/locustfile.py --host=http://localhost:8000
```

---

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow PEP 8 guidelines
- Write unit tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## Troubleshooting

### Common Issues

**Issue: Model not found**
```
Solution: Verify model exists in registry
$ ls -la /path/to/models/
```

**Issue: API connection timeout**
```
Solution: Check API server is running and accessible
$ curl http://localhost:8000/health
```

**Issue: Out of memory during inference**
```
Solution: Reduce batch size or increase available memory
config.yaml: batch_size: 8 (reduce from 32)
```

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contact & Support

- **Issues**: [GitHub Issues](https://github.com/raj3kk/ai-builder/issues)
- **Discussions**: [GitHub Discussions](https://github.com/raj3kk/ai-builder/discussions)
- **Email**: support@ai-builder.com

---

**Last Updated**: 2026-01-04  
**Current Version**: 1.0.0
