import { NextRequest, NextResponse } from 'next/server';

// GET handler - Fetch all projects
export async function GET(request: NextRequest) {
  try {
    // TODO: Replace with actual database query
    // This is a placeholder implementation
    const projects = [
      {
        id: '1',
        name: 'Sample Project 1',
        description: 'A sample AI project',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json(
      {
        success: true,
        data: projects,
        message: 'Projects retrieved successfully',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch projects',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// POST handler - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, description } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          message: 'Project name is required and must be a non-empty string',
        },
        { status: 400 }
      );
    }

    if (description && typeof description !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Project description must be a string',
        },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database insert
    const newProject = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      description: description || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: newProject,
        message: 'Project created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid JSON in request body',
        },
        { status: 400 }
      );
    }

    console.error('Error creating project:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create project',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
