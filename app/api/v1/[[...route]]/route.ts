import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { route: string[] } }) {
    const route = params.route?.join('/') || '';

    if (route === 'dashboard/stats') {
        return NextResponse.json({
            data: {
                totalBalance: 125400.50,
                income: 45000.00,
                expenses: 12000.50,
                savingsRate: 73.3
            }
        });
    }

    if (route === 'dashboard/transactions') {
        return NextResponse.json({
            data: [
                { id: '1', date: '2025-02-12', amount: -150.00, merchant: 'Amazon', category: 'Shopping', status: 'completed' },
                { id: '2', date: '2025-02-11', amount: 3500.00, merchant: 'Paystack Salary', category: 'Income', status: 'completed' },
                { id: '3', date: '2025-02-10', amount: -45.50, merchant: 'Uber', category: 'Transport', status: 'pending' },
            ]
        });
    }

    if (route === 'auth/me') {
        return NextResponse.json({
            data: {
                id: 'user_123',
                email: 'eberewill@gmail.com',
                first_name: 'Williams',
                last_name: 'Alaobi',
                org_name: 'Connect Hive'
            }
        });
    }

    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}

export async function POST(req: NextRequest, { params }: { params: { route: string[] } }) {
    const route = params.route?.join('/') || '';

    if (route === 'auth/login') {
        const body = await req.json();
        if (body.email === 'eberewill@gmail.com' && body.password === 'Password123!') {
            return NextResponse.json({
                data: {
                    token: 'mock_token_abc_123',
                    expires_at: '2026-01-01T00:00:00Z'
                }
            });
        }
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}
