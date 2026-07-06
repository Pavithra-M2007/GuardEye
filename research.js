document.addEventListener('DOMContentLoaded', function() {
    initWorldMapChart();
    initFirmwareChart();
    initRiskPredictionChart();
    initAnomalyChart();
});

function initWorldMapChart() {
    const ctx = document.getElementById('worldMapChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
            datasets: [{
                label: 'Vulnerable Cameras (thousands)',
                data: [450, 380, 920, 180, 95, 125],
                backgroundColor: [
                    'rgba(0, 243, 255, 0.6)',
                    'rgba(0, 255, 136, 0.6)',
                    'rgba(255, 0, 85, 0.6)',
                    'rgba(255, 107, 0, 0.6)',
                    'rgba(255, 237, 0, 0.6)',
                    'rgba(180, 0, 255, 0.6)'
                ],
                borderColor: [
                    'rgb(0, 243, 255)',
                    'rgb(0, 255, 136)',
                    'rgb(255, 0, 85)',
                    'rgb(255, 107, 0)',
                    'rgb(255, 237, 0)',
                    'rgb(180, 0, 255)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#8892b0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 243, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#e0e6ed',
                        font: {
                            family: 'Rajdhani',
                            size: 12
                        }
                    },
                    grid: {
                        color: 'rgba(0, 243, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function initFirmwareChart() {
    const ctx = document.getElementById('firmwareChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Hikvision v5.4.x', 'Dahua v2.8.x', 'Uniview v1.6.x', 'Axis M10x', 'Bosch NBN', 'Others'],
            datasets: [{
                label: 'Exploitation Incidents',
                data: [2847, 1923, 1456, 892, 734, 1678],
                backgroundColor: 'rgba(255, 0, 85, 0.6)',
                borderColor: 'rgb(255, 0, 85)',
                borderWidth: 2
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: '#8892b0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 243, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#e0e6ed',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 243, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function initRiskPredictionChart() {
    const ctx = document.getElementById('riskPredictionChart');
    if (!ctx) return;
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'IoT Botnet Attacks',
                    data: [320, 385, 410, 478, 520, 595, 640, 710, 780, 850, 920, 1050],
                    borderColor: 'rgb(255, 0, 85)',
                    backgroundColor: 'rgba(255, 0, 85, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Credential Stuffing',
                    data: [180, 210, 245, 290, 335, 380, 425, 480, 535, 590, 645, 700],
                    borderColor: 'rgb(255, 107, 0)',
                    backgroundColor: 'rgba(255, 107, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Zero-Day Exploits',
                    data: [45, 52, 61, 73, 88, 105, 124, 146, 171, 199, 230, 265],
                    borderColor: 'rgb(0, 243, 255)',
                    backgroundColor: 'rgba(0, 243, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e6ed',
                        font: {
                            family: 'Rajdhani',
                            size: 12
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#8892b0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 243, 255, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#e0e6ed',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 243, 255, 0.1)'
                    }
                }
            }
        }
    });
}

function initAnomalyChart() {
    const ctx = document.getElementById('anomalyChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Network Traffic',
                'Login Attempts',
                'Firmware Updates',
                'Config Changes',
                'Stream Access',
                'Port Scans'
            ],
            datasets: [{
                label: 'Normal Behavior',
                data: [65, 59, 90, 81, 56, 55],
                borderColor: 'rgb(0, 255, 136)',
                backgroundColor: 'rgba(0, 255, 136, 0.2)',
                borderWidth: 2
            }, {
                label: 'Anomaly Detected',
                data: [28, 48, 40, 19, 96, 87],
                borderColor: 'rgb(255, 0, 85)',
                backgroundColor: 'rgba(255, 0, 85, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#e0e6ed',
                        font: {
                            family: 'Rajdhani',
                            size: 12
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 243, 255, 0.2)'
                    },
                    grid: {
                        color: 'rgba(0, 243, 255, 0.2)'
                    },
                    pointLabels: {
                        color: '#e0e6ed',
                        font: {
                            family: 'Rajdhani',
                            size: 11
                        }
                    },
                    ticks: {
                        color: '#8892b0',
                        backdropColor: 'transparent'
                    }
                }
            }
        }
    });
}
