@extends('layouts.app')

@push('start-head-scripts')
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/php-wasm/php-tags.mjs"></script>

    <script>
        window.Fruits = @json($fruits)
    </script>

@endpush

@section('content')
    <div>

        @foreach($fruits as $fruit)
            <div>{{ $fruit }}</div>
        @endforeach

        <div id="chart"></div>

    </div>

    <script>
        let options = {
            series: [
                {
                    name: 'Actual',
                    data: [
                        {
                            x: '2011',
                            y: 12,
                        },
                        {
                            x: '2012',
                            y: 44,
                        },
                    ]
                }
            ],
            chart: {
                height: 350,
                type: 'bar'
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                }
            },
            colors: ['#00E396'],
            legend: {
                show: true,
                showForSingleSeries: true,
                customLegendItems: ['Actual'],
            }
        }

        let chart = new ApexCharts(document.querySelector("#chart"), options)

        chart.render()

    </script>
@endsection
