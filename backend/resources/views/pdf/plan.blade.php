<!DOCTYPE html>
<html lang="sr">
<head>
    <meta charset="UTF-8">
    <title>Plan putovanja - {{ $plan->naziv }}</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            line-height: 1.6;
            margin: 40px;
            color: #333;
        }

        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #ccc;
            padding-bottom: 10px;
        }

        .section {
            margin-bottom: 20px;
        }

        .label {
            font-weight: bold;
            color: #555;
        }

        .value {
            margin-left: 10px;
        }

        .footer {
            position: absolute;
            bottom: 40px;
            font-size: 12px;
            color: #aaa;
        }
    </style>
</head>
<body>
    <h1>📍 Plan putovanja: {{ $plan->naziv }}</h1>

    <div class="section">
        <span class="label">Ukupni troškovi:</span>
        <span class="value">{{ number_format($plan->ukupni_troskovi, 2, ',', '.') }} €</span>
    </div>

    <div class="section">
        <span class="label">Broj dana:</span>
        <span class="value">{{ $plan->broj_dana }}</span>
    </div>

    <div class="section">
        <span class="label">Datum kreiranja:</span>
        <span class="value">{{ \Carbon\Carbon::parse($plan->created_at)->format('d.m.Y. H:i') }}</span>
    </div>

    <div class="footer">
        Plan generisan putem aplikacije za planiranje putovanja – {{ config('app.name', 'TravelPlanner') }}
    </div>
</body>
</html>
