import { syncContractsFinderTenders } from "@/lib/tenders/ingest";

async function main() {
  const result = await syncContractsFinderTenders();
  console.log(
    JSON.stringify(
      {
        message: "Tender sync completed",
        ...result
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
