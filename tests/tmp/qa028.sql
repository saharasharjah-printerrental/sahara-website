UPDATE faqs SET supportingPoints = replace(supportingPoints, 'from AED 400', 'AED 900/month'),
  answer = answer
WHERE id = 'qa-shr-2';
UPDATE faqs SET supportingPoints = replace(supportingPoints, 'from AED 150', 'AED 450/month')
WHERE id = 'qa-shr-2';
