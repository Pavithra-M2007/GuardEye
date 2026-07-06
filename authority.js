let cameras = [];
let scannedCount = 0;
let totalVulnerabilities = 0;
let highRiskCount = 0;

const vulnerabilityTemplates = [
    { type: 'critical', title: 'Default Credentials Detected', description: 'Camera is using default admin credentials. Immediate security risk.' },
    { type: 'high', title: 'Outdated Firmware Version', description: 'Firmware version contains known security vulnerabilities.' },
    { type: 'high', title: 'Open Port 23 (Telnet)', description: 'Telnet port is exposed, allowing unencrypted remote access.' },
    { type: 'medium', title: 'Weak Encryption Protocol', description: 'Using outdated SSL/TLS version vulnerable to attacks.' },
    { type: 'medium', title: 'RTSP Stream Exposed', description: 'Video stream accessible without authentication.' },
    { type: 'low', title: 'HTTP Server Banner Disclosure', description: 'Server version information exposed in headers.' },
    { type: 'critical', title: 'Buffer Overflow Vulnerability', description: 'Potential buffer overflow in camera firmware detected.' },
    { type: 'high', title: 'SQL Injection Possible', description: 'Web interface vulnerable to SQL injection attacks.' }
];

function updateDashboard() {
    document.getElementById('totalCameras').textContent = cameras.length;
    document.getElementById('scannedCameras').textContent = scannedCount;
    document.getElementById('vulnerabilities').textContent = totalVulnerabilities;
    document.getElementById('highRisk').textContent = highRiskCount;
}

function renderCameras() {
    const grid = document.getElementById('camerasGrid');
    
    if (cameras.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📹</div>
                <p>No cameras registered yet. Add a camera to get started.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = cameras.map(camera => `
        <div class="camera-card" data-id="${camera.id}">
            <div class="camera-header">
                <div class="camera-id">${camera.id}</div>
                <span class="status-badge ${camera.scanned ? 'status-scanned' : 'status-active'}">
                    ${camera.scanned ? 'Scanned' : 'Active'}
                </span>
            </div>
            <div class="camera-details">
                <div class="detail-row">
                    <span class="detail-label">IP Address:</span>
                    <span class="detail-value">${camera.ip}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Model:</span>
                    <span class="detail-value">${camera.model}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Firmware:</span>
                    <span class="detail-value">${camera.firmware}</span>
                </div>
            </div>
            <div class="camera-actions">
                <button class="btn-scan" onclick="runScan('${camera.id}')">
                    ${camera.scanned ? 'Re-scan' : 'Run Scan'}
                </button>
                <button class="btn-report" onclick="viewReport('${camera.id}')" ${!camera.scanned ? 'disabled' : ''}>
                    View Report
                </button>
            </div>
        </div>
    `).join('');
}

document.getElementById('addCameraForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const camera = {
        id: document.getElementById('cameraId').value,
        ip: document.getElementById('ipAddress').value,
        model: document.getElementById('model').value,
        firmware: document.getElementById('firmware').value,
        scanned: false,
        vulnerabilities: []
    };
    
    cameras.push(camera);
    renderCameras();
    updateDashboard();
    updateChart();
    
    this.reset();
    
    const notification = document.createElement('div');
    notification.textContent = '✓ Camera added successfully!';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 255, 136, 0.2);
        border: 1px solid var(--neon-green);
        color: var(--neon-green);
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
});

function runScan(cameraId) {
    const camera = cameras.find(c => c.id === cameraId);
    if (!camera) return;
    
    const modal = document.getElementById('scanModal');
    modal.classList.add('active');
    
    const statusMessages = [
        'Initializing scan...',
        'Checking network ports...',
        'Analyzing firmware version...',
        'Testing authentication...',
        'Scanning for vulnerabilities...',
        'Checking encryption protocols...',
        'Analyzing security headers...',
        'Compiling results...'
    ];
    
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
        progress += 12.5;
        messageIndex++;
        
        document.getElementById('progressFill').style.width = progress + '%';
        document.getElementById('scanPercentage').textContent = Math.round(progress) + '%';
        
        if (messageIndex < statusMessages.length) {
            document.getElementById('scanStatus').textContent = statusMessages[messageIndex];
        }
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                modal.classList.remove('active');
                completeScan(camera);
            }, 500);
        }
    }, 400);
}

function completeScan(camera) {
    const numVulns = Math.floor(Math.random() * 4) + 3;
    camera.vulnerabilities = [];
    
    const shuffled = [...vulnerabilityTemplates].sort(() => 0.5 - Math.random());
    camera.vulnerabilities = shuffled.slice(0, numVulns);
    
    camera.scanned = true;
    scannedCount++;
    totalVulnerabilities += numVulns;
    
    const criticalCount = camera.vulnerabilities.filter(v => v.type === 'critical').length;
    const highCount = camera.vulnerabilities.filter(v => v.type === 'high').length;
    highRiskCount += (criticalCount + highCount);
    
    renderCameras();
    updateDashboard();
    updateChart();
    
    const notification = document.createElement('div');
    notification.innerHTML = `
        <strong>Scan Complete!</strong><br>
        Found ${numVulns} vulnerabilities on ${camera.id}
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 243, 255, 0.2);
        border: 1px solid var(--neon-blue);
        color: var(--neon-blue);
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
}

function viewReport(cameraId) {
    const camera = cameras.find(c => c.id === cameraId);
    if (!camera || !camera.scanned) return;
    
    const modal = document.getElementById('reportModal');
    const content = document.getElementById('reportContent');
    
    const vulnHTML = camera.vulnerabilities.map(vuln => `
        <div class="vulnerability-item ${vuln.type}">
            <div class="vuln-title">${vuln.title}</div>
            <div class="vuln-description">${vuln.description}</div>
        </div>
    `).join('');
    
    content.innerHTML = `
        <h3 style="color: var(--neon-blue); margin-bottom: 1rem;">Camera: ${camera.id}</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem;">
            <div><strong>IP:</strong> ${camera.ip}</div>
            <div><strong>Model:</strong> ${camera.model}</div>
            <div style="grid-column: 1 / -1;"><strong>Firmware:</strong> ${camera.firmware}</div>
        </div>
        <h3 style="color: var(--neon-red); margin-bottom: 1rem;">Vulnerabilities Found: ${camera.vulnerabilities.length}</h3>
        ${vulnHTML}
    `;
    
    modal.classList.add('active');
}

function closeReportModal() {
    document.getElementById('reportModal').classList.remove('active');
}

window.onclick = function(event) {
    const scanModal = document.getElementById('scanModal');
    const reportModal = document.getElementById('reportModal');
    if (event.target === scanModal) {
        scanModal.classList.remove('active');
    }
    if (event.target === reportModal) {
        reportModal.classList.remove('active');
    }
}

let riskChart = null;

function updateChart() {
    const ctx = document.getElementById('riskChart');
    if (!ctx) return;
    
    const criticalCount = cameras.reduce((sum, c) => 
        sum + (c.vulnerabilities?.filter(v => v.type === 'critical').length || 0), 0);
    const highCount = cameras.reduce((sum, c) => 
        sum + (c.vulnerabilities?.filter(v => v.type === 'high').length || 0), 0);
    const mediumCount = cameras.reduce((sum, c) => 
        sum + (c.vulnerabilities?.filter(v => v.type === 'medium').length || 0), 0);
    const lowCount = cameras.reduce((sum, c) => 
        sum + (c.vulnerabilities?.filter(v => v.type === 'low').length || 0), 0);
    
    if (riskChart) {
        riskChart.destroy();
    }
    
    riskChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Critical', 'High', 'Medium', 'Low'],
            datasets: [{
                data: [criticalCount, highCount, mediumCount, lowCount],
                backgroundColor: [
                    'rgba(255, 0, 85, 0.7)',
                    'rgba(255, 107, 0, 0.7)',
                    'rgba(255, 237, 0, 0.7)',
                    'rgba(0, 255, 136, 0.7)'
                ],
                borderColor: [
                    'rgb(255, 0, 85)',
                    'rgb(255, 107, 0)',
                    'rgb(255, 237, 0)',
                    'rgb(0, 255, 136)'
                ],
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
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

updateChart();
