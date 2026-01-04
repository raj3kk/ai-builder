'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Puzzle, Rocket, Users, Code2, Sparkles } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Build and deploy AI applications in seconds with our intuitive drag-and-drop interface.',
    },
    {
      icon: <Puzzle className="w-8 h-8" />,
      title: 'Modular Components',
      description: 'Use pre-built AI modules and customize them to fit your unique requirements.',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Production Ready',
      description: 'Deploy to production with confidence using industry-standard best practices.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'Work seamlessly with your team in real-time on shared AI projects.',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Developer Friendly',
      description: 'Full API access and code export for advanced customization and integration.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI Powered',
      description: 'Leverage cutting-edge AI models from leading providers integrated seamlessly.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Project',
      description: 'Start a new AI project with just a few clicks',
    },
    {
      number: '02',
      title: 'Build & Configure',
      description: 'Add components and configure your AI pipeline',
    },
    {
      number: '03',
      title: 'Test & Iterate',
      description: 'Test your application and refine with real-time feedback',
    },
    {
      number: '04',
      title: 'Deploy & Monitor',
      description: 'Deploy to production and monitor performance metrics',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-white">AI Builder</span>
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#features" className="text-slate-300 hover:text-white transition">Features</a>
              <a href="#how-it-works" className="text-slate-300 hover:text-white transition">How It Works</a>
              <a href="#" className="text-slate-300 hover:text-white transition">Pricing</a>
              <a href="#" className="text-slate-300 hover:text-white transition">Docs</a>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Welcome to AI Builder
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Build AI Applications
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Without the Complexity
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            AI Builder empowers developers and non-developers alike to create, deploy, and scale intelligent applications with an intuitive, visual interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsLoading(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </button>
            <Link
              href="#"
              className="border border-slate-600 hover:border-slate-400 text-white px-8 py-4 rounded-lg font-semibold transition"
            >
              View Demo
            </Link>
          </div>

          <div className="pt-8">
            <img
              src="https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&q=80"
              alt="AI Builder Interface"
              className="rounded-xl shadow-2xl border border-slate-700"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-400">
            Everything you need to build production-ready AI applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition group"
            >
              <div className="text-blue-400 mb-4 group-hover:scale-110 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-400">
            Get from zero to deployed in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
                <div className="text-5xl font-bold text-blue-500/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-400">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your AI Application?
          </h2>
          <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building the future with AI Builder. Start free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition">
              Start Building Now
            </button>
            <Link
              href="#"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <span className="font-bold text-white">AI Builder</span>
              </div>
              <p className="text-slate-400 text-sm">
                Build AI applications without the complexity.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2026 AI Builder. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">GitHub</a>
              <a href="#" className="hover:text-white transition">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
