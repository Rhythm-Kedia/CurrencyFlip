$(document).ready(function () {
    $('#arbitrage-paths').val(3);
    $('#from-currency, #to-currency, #arbitrage-from-currency, #arbitrage-to-currency').select2({
        placeholder: 'Select a currency',
        allowClear: true
    });
    $(document).on('select2:open', () => {
        document.querySelector('.select2-search__field').focus();
    });

    // Adding the flip functionality
    $('#flip-button').on('click', function () {
        const fromCurrency = $('#from-currency').val();
        const toCurrency = $('#to-currency').val();
        $('#from-currency').val(toCurrency).trigger('change');
        $('#to-currency').val(fromCurrency).trigger('change');
    });

    $('#flip-arbitrage-button').on('click', function () {
        const fromCurrency = $('#arbitrage-from-currency').val();
        const toCurrency = $('#arbitrage-to-currency').val();
        $('#arbitrage-from-currency').val(toCurrency).trigger('change');
        $('#arbitrage-to-currency').val(fromCurrency).trigger('change');
    });

    // Currency Conversion
    $('#currency-form').on('submit', function (e) {
        e.preventDefault();
        const amount = $('#amount').val();
        const fromCurrency = $('#from-currency').val();
        const toCurrency = $('#to-currency').val();
        if (!amount || !fromCurrency || !toCurrency) {
            alert('Please fill out all fields.');
            return;
        }
        const apiUrl = `https://v6.exchangerate-api.com/v6/ee7334b27ca48a198bf77c9d/latest/${fromCurrency}`;
        $.get(apiUrl, function (data) {
            if (data.result === 'success') {
                const rate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount * rate);
                $('#result').html(
                    `<span class="small-text">Converted ${amount} ${fromCurrency} to ${toCurrency}:</span><br>
                    <span class="result-value">${convertedAmount} ${toCurrency}</span>`
                );
            } else {
                alert('Error fetching exchange rates.');
            }
        });
    });

    // Arbitrage Handling
    $('#calculate-arbitrage').on('click', function () {
        const fromCurrency = $('#arbitrage-from-currency').val();
        const toCurrency = $('#arbitrage-to-currency').val();
        const numPaths = parseInt($('#arbitrage-paths').val());
        const currencies = ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLP', 'CNY', 'COP', 'CRC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'FOK', 'GBP', 'GEL', 'GGP', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'IMP', 'INR', 'IQD', 'IRR', 'ISK', 'JEP', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KID', 'KMF', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLE', 'SOS', 'SRD', 'SSP', 'STN', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TVD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XCD', 'XDR', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL']; // Example currency list
        
        if (!fromCurrency || !toCurrency || !numPaths) {
            alert('Please fill out all fields.');
            return;
        }
        if (fromCurrency === toCurrency) {
            alert('From and To currencies must be different.');
            return;
        }
        const apiUrlFrom = `https://v6.exchangerate-api.com/v6/ee7334b27ca48a198bf77c9d/latest/${fromCurrency}`;
        $.get(apiUrlFrom, function (dataFrom) {
            if (dataFrom.result === 'success') {
                const ratesFrom = dataFrom.conversion_rates;
                const paths = [];

                currencies.forEach((intermediateCurrency) => {
                    if (intermediateCurrency !== fromCurrency && intermediateCurrency !== toCurrency) {
                        const apiUrlIntermediate = `https://v6.exchangerate-api.com/v6/ee7334b27ca48a198bf77c9d/latest/${intermediateCurrency}`;
                        $.get(apiUrlIntermediate, function (dataIntermediate) {
                            if (dataIntermediate.result === 'success') {
                                const ratesIntermediate = dataIntermediate.conversion_rates;
                                const rateToIntermediate = ratesFrom[intermediateCurrency];
                                const rateToTarget = ratesIntermediate[toCurrency];

                                if (rateToIntermediate && rateToTarget) {
                                    const totalRate = rateToIntermediate * rateToTarget;
                                    const directRate = ratesFrom[toCurrency];
                                    const benefit = ((totalRate - directRate) / directRate) * 100;

                                    paths.push({
                                        path: `${fromCurrency} → ${intermediateCurrency} → ${toCurrency}`,
                                        benefit: benefit.toFixed(2)
                                    });

                                    if (paths.length === currencies.length - 2) {
                                        paths.sort((a, b) => b.benefit - a.benefit);
                                        const tableBody = $('#arbitrage-results tbody');
                                        tableBody.empty();

                                        paths.slice(0, numPaths).forEach((entry, index) => {
                                            tableBody.append(
                                                `<tr>
                                                    <td>${index + 1}</td>
                                                    <td>${entry.path}</td>
                                                    <td>${entry.benefit}%</td>
                                                </tr>`
                                            );
                                        });
                                        if (numPaths > 159) {
                                            tableBody.append(
                                                `<tr>
                                                    <td colspan="3" class="custom-message">
                                                        No more currencies' data available!
                                                        Only 161 Currencies in our database currently.
                                                    </td>
                                                </tr>`
                                            );
                                        }
                                    }
                                }
                            } else {
                                alert('Error fetching exchange rates for intermediate currency.');
                            }
                        });
                    }
                });
            } else {
                alert('Error fetching exchange rates for the base currency.');
            }
        });
    });
});
