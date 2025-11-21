
export interface ClaimData {
  jurisdiction: string;
  plaintiffName: string;
  plaintiffAddress: string;
  defendantName: string;
  defendantAddress: string;
  claimAmount: string;
  reasonForClaim: string;
  dateOfIncident: string;
}

export const generateStatementOfClaim = (data: ClaimData): string => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const formattedAmount = parseFloat(data.claimAmount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return `
IN THE SMALL CLAIMS COURT OF THE STATE OF ${data.jurisdiction.toUpperCase()}

Case Number: _________________________ (To be assigned by the Clerk of Court)

--------------------------------------------------------------------------------

PLAINTIFF:
${data.plaintiffName}
${data.plaintiffAddress.replace(/\n/g, '\n')}

vs.

DEFENDANT:
${data.defendantName}
${data.defendantAddress.replace(/\n/g, '\n')}

--------------------------------------------------------------------------------

STATEMENT OF CLAIM

1. JURISDICTION
This court has jurisdiction over this matter because the Defendant resides or does business in this county, or the event giving rise to this claim occurred in this county. The amount in controversy is within the jurisdictional limits of this Small Claims Court.

2. PARTIES
a. The Plaintiff is ${data.plaintiffName}, residing at ${data.plaintiffAddress}.
b. The Defendant is ${data.defendantName}, residing at or doing business at ${data.defendantAddress}.

3. STATEMENT OF FACTS AND REASON FOR CLAIM
The Plaintiff, ${data.plaintiffName}, brings this claim against the Defendant, ${data.defendantName}, for the amount of ${formattedAmount}. This claim arises from events that occurred on or around ${new Date(data.dateOfIncident).toLocaleDateString('en-US')}.

The basis for this claim is as follows:
${data.reasonForClaim}

4. RELIEF REQUESTED (PRAYER FOR RELIEF)
WHEREFORE, the Plaintiff demands judgment against the Defendant for the following:
a. Monetary damages in the principal amount of ${formattedAmount}.
b. Court costs associated with filing this claim.
c. Any other relief that the Court deems just and proper.

--------------------------------------------------------------------------------

VERIFICATION

I, ${data.plaintiffName}, declare under penalty of perjury under the laws of the State of ${data.jurisdiction} that the foregoing is true and correct to the best of my knowledge and belief.

Date: ${currentDate}


________________________________________
(Signature of Plaintiff)

${data.plaintiffName} (Printed Name)
`;
};


export const US_STATES = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];
