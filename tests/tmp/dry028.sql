SELECT instr(content,'<a href="/rental-calculator/">Get a Free Quote</a>') AS oldlink,
       instr(content,'from AED 150, with contract terms customised to your requirement.') AS old6
FROM blogs WHERE slug='paper-shredder-rental-uae-when-it-beats-buying';
